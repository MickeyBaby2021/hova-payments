
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, User, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Transfer = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [recipientName, setRecipientName] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    
    if (!amountValue || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!recipientName && !recipientUsername) {
      toast.error("Please enter recipient details");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      const success = deductFromBalance(amountValue);
      
      if (success) {
        toast.success("Transfer successful!");
        navigate("/dashboard");
      }
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Transfer Money</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Tabs defaultValue="hovapay" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="hovapay">HovaPay User</TabsTrigger>
            <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hovapay">
            <Card className="p-6">
              <form onSubmit={handleTransfer} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username or Phone</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="username"
                      placeholder="Enter recipient's username or phone"
                      className="pl-10"
                      value={recipientUsername}
                      onChange={(e) => setRecipientUsername(e.target.value)}
                    />
                  </div>
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Input
                    id="note"
                    placeholder="Add a note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !amount || !recipientUsername}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : null}
                  Send Money
                </Button>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="bank">
            <Card className="p-6">
              <form onSubmit={handleTransfer} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <select className="w-full p-2 border border-border rounded-md bg-background">
                    <option value="">Select Bank</option>
                    <option value="access">Access Bank</option>
                    <option value="gtb">Guaranty Trust Bank</option>
                    <option value="zenith">Zenith Bank</option>
                    <option value="firstbank">First Bank</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    maxLength={10}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Account Name</Label>
                  <Input
                    id="name"
                    placeholder="Account name will appear here"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    readOnly
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Input
                    id="note"
                    placeholder="Add a note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={true}
                >
                  Send Money
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Bank transfers are coming soon!
                </p>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Transfer;
