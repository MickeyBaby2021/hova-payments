
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Plus, Building, Trash2, Edit, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";

interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  isDefault: boolean;
}

interface CreditCard {
  id: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  type: "visa" | "mastercard" | "verve";
  isDefault: boolean;
}

const formatCardNumber = (number: string) => {
  return number.replace(/\d{4}(?=.)/g, "$& ");
};

const maskCardNumber = (number: string) => {
  const last4 = number.slice(-4);
  return `•••• •••• •••• ${last4}`;
};

const CardsAndBanks = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [cards, setCards] = useState<CreditCard[]>([
    {
      id: "1",
      cardNumber: "4111111111111111",
      cardholderName: "John Doe",
      expiryDate: "12/25",
      type: "visa",
      isDefault: true
    },
    {
      id: "2",
      cardNumber: "5555555555554444",
      cardholderName: "John Doe",
      expiryDate: "10/26",
      type: "mastercard",
      isDefault: false
    }
  ]);
  
  const [banks, setBanks] = useState<BankAccount[]>([
    {
      id: "1",
      accountName: "John Doe",
      accountNumber: "1234567890",
      bankName: "First Bank",
      isDefault: true
    }
  ]);
  
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    type: "visa" as "visa" | "mastercard" | "verve"
  });
  
  const [newBank, setNewBank] = useState({
    accountName: "",
    accountNumber: "",
    bankName: ""
  });

  const handleAddCard = () => {
    setIsLoading(true);
    
    // Validate card fields
    if (!newCard.cardNumber || !newCard.cardholderName || !newCard.expiryDate || !newCard.cvv) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const card: CreditCard = {
        id: Date.now().toString(),
        cardNumber: newCard.cardNumber.replace(/\s/g, ""),
        cardholderName: newCard.cardholderName,
        expiryDate: newCard.expiryDate,
        type: newCard.type,
        isDefault: cards.length === 0
      };
      
      setCards(prev => [...prev, card]);
      
      setNewCard({
        cardNumber: "",
        cardholderName: "",
        expiryDate: "",
        cvv: "",
        type: "visa"
      });
      
      setIsLoading(false);
      setIsAddingCard(false);
      
      toast.success("Card added successfully");
      
      addNotification({
        title: "Card Added",
        message: "Your card has been successfully added to your account",
        type: "system"
      });
    }, 1500);
  };

  const handleAddBank = () => {
    setIsLoading(true);
    
    // Validate bank fields
    if (!newBank.accountName || !newBank.accountNumber || !newBank.bankName) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const bank: BankAccount = {
        id: Date.now().toString(),
        accountName: newBank.accountName,
        accountNumber: newBank.accountNumber,
        bankName: newBank.bankName,
        isDefault: banks.length === 0
      };
      
      setBanks(prev => [...prev, bank]);
      
      setNewBank({
        accountName: "",
        accountNumber: "",
        bankName: ""
      });
      
      setIsLoading(false);
      setIsAddingBank(false);
      
      toast.success("Bank account added successfully");
      
      addNotification({
        title: "Bank Account Added",
        message: "Your bank account has been successfully added",
        type: "system"
      });
    }, 1500);
  };

  const handleDeleteCard = (id: string) => {
    setCards(prev => prev.filter(card => card.id !== id));
    toast.success("Card removed successfully");
  };

  const handleDeleteBank = (id: string) => {
    setBanks(prev => prev.filter(bank => bank.id !== id));
    toast.success("Bank account removed successfully");
  };

  const handleSetDefaultCard = (id: string) => {
    setCards(prev => 
      prev.map(card => ({
        ...card,
        isDefault: card.id === id
      }))
    );
    toast.success("Default card updated");
  };

  const handleSetDefaultBank = (id: string) => {
    setBanks(prev => 
      prev.map(bank => ({
        ...bank,
        isDefault: bank.id === id
      }))
    );
    toast.success("Default bank account updated");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Cards & Banks</h1>
        </div>

        {/* Cards Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Payment Cards</h2>
            <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Card
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Payment Card</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={newCard.cardNumber}
                      onChange={(e) => setNewCard(prev => ({
                        ...prev,
                        cardNumber: e.target.value
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="Name on card"
                      value={newCard.cardholderName}
                      onChange={(e) => setNewCard(prev => ({
                        ...prev,
                        cardholderName: e.target.value
                      }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={newCard.expiryDate}
                        onChange={(e) => setNewCard(prev => ({
                          ...prev,
                          expiryDate: e.target.value
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        maxLength={4}
                        value={newCard.cvv}
                        onChange={(e) => setNewCard(prev => ({
                          ...prev,
                          cvv: e.target.value
                        }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardType">Card Type</Label>
                    <Select 
                      value={newCard.type} 
                      onValueChange={(value: "visa" | "mastercard" | "verve") => 
                        setNewCard(prev => ({
                          ...prev,
                          type: value
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="mastercard">Mastercard</SelectItem>
                        <SelectItem value="verve">Verve</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleAddCard}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Add Card
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {cards.length > 0 ? (
            <div className="space-y-3">
              {cards.map((card) => (
                <Card key={card.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                        <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">{maskCardNumber(card.cardNumber)}</p>
                        <p className="text-sm text-muted-foreground">Expires {card.expiryDate}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-xs font-medium uppercase">{card.type}</p>
                          {card.isDefault && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Default</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {!card.isDefault && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleSetDefaultCard(card.id)}
                          title="Set as default"
                        >
                          <CreditCard className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteCard(card.id)}
                        title="Delete card"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <CreditCard className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">No cards added yet</p>
              <Button 
                className="mt-4"
                onClick={() => setIsAddingCard(true)}
              >
                Add Your First Card
              </Button>
            </Card>
          )}
        </div>

        {/* Bank Accounts Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Bank Accounts</h2>
            <Dialog open={isAddingBank} onOpenChange={setIsAddingBank}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Bank
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Bank Account</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Select 
                      value={newBank.bankName} 
                      onValueChange={(value) => 
                        setNewBank(prev => ({
                          ...prev,
                          bankName: value
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Access Bank">Access Bank</SelectItem>
                        <SelectItem value="First Bank">First Bank</SelectItem>
                        <SelectItem value="GTBank">GTBank</SelectItem>
                        <SelectItem value="UBA">UBA</SelectItem>
                        <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Enter 10-digit account number"
                      value={newBank.accountNumber}
                      onChange={(e) => setNewBank(prev => ({
                        ...prev,
                        accountNumber: e.target.value
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      placeholder="Account holder name"
                      value={newBank.accountName}
                      onChange={(e) => setNewBank(prev => ({
                        ...prev,
                        accountName: e.target.value
                      }))}
                    />
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleAddBank}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Add Bank Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {banks.length > 0 ? (
            <div className="space-y-3">
              {banks.map((bank) => (
                <Card key={bank.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                        <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">{bank.bankName}</p>
                        <p className="text-sm">{bank.accountNumber}</p>
                        <p className="text-sm text-muted-foreground">{bank.accountName}</p>
                        {bank.isDefault && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full mt-1 inline-block">Default</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {!bank.isDefault && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleSetDefaultBank(bank.id)}
                          title="Set as default"
                        >
                          <Building className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteBank(bank.id)}
                        title="Delete bank account"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <Building className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">No bank accounts added yet</p>
              <Button 
                className="mt-4"
                onClick={() => setIsAddingBank(true)}
              >
                Add Your First Bank Account
              </Button>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CardsAndBanks;
