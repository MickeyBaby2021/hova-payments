
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Copy, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { payBill } from "@/services/payment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const giftCards = [
  { 
    id: "amazon", 
    name: "Amazon Gift Card", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    description: "Shop millions of products on Amazon" 
  },
  { 
    id: "apple", 
    name: "Apple Gift Card", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    description: "For apps, games, music, and more" 
  },
  { 
    id: "google-play", 
    name: "Google Play Gift Card", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1024px-Google_Play_Store_badge_EN.svg.png",
    description: "Apps, games, and digital content"
  },
  { 
    id: "steam", 
    name: "Steam Gift Card", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
    description: "For PC gamers"
  },
  { 
    id: "xbox", 
    name: "Xbox Gift Card", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1024px-Xbox_one_logo.svg.png",
    description: "For games and entertainment"
  },
  { 
    id: "playstation", 
    name: "PlayStation Gift Card", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/2560px-PlayStation_logo.svg.png",
    description: "For PS games and more"
  },
  { 
    id: "netflix", 
    name: "Netflix Gift Card", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
    description: "Stream movies and TV shows"
  },
  { 
    id: "spotify", 
    name: "Spotify Gift Card", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png",
    description: "For premium music streaming"
  }
];

const GiftCards = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedCard, setSelectedCard] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [purchasedCode, setPurchasedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    
    if (!amountValue || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!selectedCard) {
      toast.error("Please select a gift card");
      return;
    }
    
    if (!recipient) {
      toast.error("Please enter recipient's email");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First deduct from wallet
      const isDeducted = deductFromBalance(amountValue);
      
      if (!isDeducted) {
        setIsLoading(false);
        return;
      }
      
      // Then process VTPass payment
      const card = giftCards.find(c => c.id === selectedCard);
      
      if (!card) {
        toast.error("Invalid card selected");
        setIsLoading(false);
        return;
      }
      
      const success = await payBill({
        serviceID: `${card.id}-gift-card`,
        amount: amountValue,
        phone: recipient,
      });
      
      if (success) {
        // Generate a fake gift card code
        const giftCardCode = `${card.id.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        
        setPurchasedCode(giftCardCode);
        toast.success(`${card.name} purchased successfully!`);
      }
    } catch (error) {
      console.error("Gift card purchase error:", error);
      toast.error("An error occurred while processing your request");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(purchasedCode);
    setCopied(true);
    toast.success("Gift card code copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/bills")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Gift Cards</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        {purchasedCode ? (
          <Card className="p-6">
            <div className="text-center mb-4">
              <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-2" />
              <h2 className="text-xl font-bold">Purchase Successful!</h2>
              <p className="text-muted-foreground mb-4">
                Your gift card has been generated
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg text-center mb-4">
              <p className="text-sm text-muted-foreground mb-2">Gift Card Code</p>
              <div className="flex items-center justify-center space-x-2">
                <div className="text-xl font-mono font-bold overflow-x-auto p-2 max-w-full">
                  {purchasedCode}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={copyToClipboard}
                >
                  {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-center">
                An email with the gift card details has been sent to {recipient}
              </p>
              <Button 
                className="w-full" 
                onClick={() => {
                  setPurchasedCode("");
                  setSelectedCard("");
                  setAmount("");
                  setRecipient("");
                  setMessage("");
                }}
              >
                Purchase Another
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <form onSubmit={handlePurchase} className="space-y-6">
              <div className="space-y-2">
                <Label>Select Gift Card</Label>
                <Select 
                  value={selectedCard} 
                  onValueChange={setSelectedCard}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gift card type" />
                  </SelectTrigger>
                  <SelectContent>
                    {giftCards.map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        <div className="flex items-center space-x-2">
                          <div className="h-5 w-5 relative overflow-hidden">
                            <img 
                              src={card.logo} 
                              alt={card.name} 
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span>{card.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCard && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {giftCards.find(c => c.id === selectedCard) && (
                    <Card className="col-span-2 bg-muted/30 p-4 flex items-center space-x-4">
                      <div className="h-14 w-14 bg-white rounded-lg flex items-center justify-center p-2">
                        <img 
                          src={giftCards.find(c => c.id === selectedCard)?.logo} 
                          alt={giftCards.find(c => c.id === selectedCard)?.name} 
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{giftCards.find(c => c.id === selectedCard)?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {giftCards.find(c => c.id === selectedCard)?.description}
                        </p>
                      </div>
                    </Card>
                  )}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="₦0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[5000, 10000, 20000].map((amt) => (
                    <Button
                      key={amt}
                      type="button"
                      variant="outline"
                      onClick={() => setAmount(amt.toString())}
                    >
                      ₦{amt.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Email</Label>
                <Input
                  id="recipient"
                  type="email"
                  placeholder="Enter recipient's email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Input
                  id="message"
                  placeholder="Add a personal message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !amount || !selectedCard || !recipient}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : null}
                Purchase Gift Card
              </Button>
            </form>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GiftCards;
