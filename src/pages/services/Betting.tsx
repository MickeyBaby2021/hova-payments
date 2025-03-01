
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Dices } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { payBill } from "@/services/payment";

const bettingPlatforms = [
  { id: "bet9ja", name: "Bet9ja", serviceID: "bet9ja" },
  { id: "betking", name: "BetKing", serviceID: "betking" },
  { id: "sportybet", name: "SportyBet", serviceID: "sportybet" },
  { id: "1xbet", name: "1xBet", serviceID: "1xbet" },
];

const Betting = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFundBetting = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    
    if (!amountValue || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!userId) {
      toast.error("Please enter your user ID");
      return;
    }
    
    if (!selectedPlatform) {
      toast.error("Please select a betting platform");
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
      
      // Then process payment
      const platform = bettingPlatforms.find(p => p.id === selectedPlatform);
      
      if (!platform) {
        toast.error("Invalid platform selected");
        setIsLoading(false);
        return;
      }
      
      const success = await payBill({
        serviceID: platform.serviceID,
        amount: amountValue,
        customerID: userId,
      });
      
      if (success) {
        toast.success(`${platform.name} account funded successfully!`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Betting account funding error:", error);
      toast.error("An error occurred while processing your request");
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-2xl font-bold">Fund Betting Account</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <form onSubmit={handleFundBetting} className="space-y-6">
            <div className="space-y-2">
              <Label>Select Betting Platform</Label>
              <div className="grid grid-cols-2 gap-3">
                {bettingPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      selectedPlatform === platform.id
                        ? "border-primary"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Dices className="h-6 w-6 text-primary" />
                      <span className="font-medium">{platform.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                placeholder="Enter your betting user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="₦0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[500, 1000, 2000, 5000].map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant="outline"
                    onClick={() => setAmount(amt.toString())}
                  >
                    ₦{amt}
                  </Button>
                ))}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !amount || !userId || !selectedPlatform}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
              Fund Account
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Betting;
