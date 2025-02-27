
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Phone, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { payBill } from "@/services/payment";

const networkProviders = [
  { id: "mtn", name: "MTN", color: "bg-yellow-500", serviceID: "mtn" },
  { id: "airtel", name: "Airtel", color: "bg-red-500", serviceID: "airtel" },
  { id: "glo", name: "Glo", color: "bg-green-500", serviceID: "glo" },
  { id: "9mobile", name: "9mobile", color: "bg-green-400", serviceID: "etisalat" },
];

const Airtime = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyAirtime = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    
    if (!amountValue || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    if (!selectedNetwork) {
      toast.error("Please select a network provider");
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
      const network = networkProviders.find(n => n.id === selectedNetwork);
      
      if (!network) {
        toast.error("Invalid network selected");
        setIsLoading(false);
        return;
      }
      
      const success = await payBill({
        serviceID: network.serviceID,
        amount: amountValue,
        phone: phoneNumber,
      });
      
      if (success) {
        toast.success(`${network.name} airtime purchased successfully!`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Airtime purchase error:", error);
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
          <h1 className="text-2xl font-bold">Buy Airtime</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <form onSubmit={handleBuyAirtime} className="space-y-6">
            <div className="space-y-2">
              <Label>Select Network</Label>
              <div className="grid grid-cols-2 gap-3">
                {networkProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      selectedNetwork === provider.id
                        ? "border-primary"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedNetwork(provider.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${provider.color}`}></div>
                      <span className="font-medium">{provider.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  className="pl-10"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[100, 200, 500, 1000].map((amt) => (
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
              disabled={isLoading || !amount || !phoneNumber || !selectedNetwork}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
              Buy Airtime
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Airtime;
