
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Droplet, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { payBill } from "@/services/payment";

const waterProviders = [
  { id: "lagos", name: "Lagos Water", serviceID: "lagos-water" },
  { id: "abuja", name: "FCT Water Board", serviceID: "abuja-water" },
  { id: "kaduna", name: "Kaduna Water", serviceID: "kaduna-water" },
  { id: "rivers", name: "Rivers Water", serviceID: "rivers-water" },
];

const Water = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyMeter = () => {
    if (!meterNumber || meterNumber.length < 5) {
      toast.error("Please enter a valid meter number");
      return;
    }
    
    if (!selectedProvider) {
      toast.error("Please select a water provider");
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate meter verification
    setTimeout(() => {
      setCustomerName("John Doe");
      setIsVerifying(false);
      toast.success("Meter verified successfully");
    }, 2000);
  };

  const handlePayWaterBill = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    
    if (!amountValue || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!customerName) {
      toast.error("Please verify meter first");
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
      const provider = waterProviders.find(p => p.id === selectedProvider);
      
      if (!provider) {
        toast.error("Invalid provider selected");
        setIsLoading(false);
        return;
      }
      
      const success = await payBill({
        serviceID: provider.serviceID,
        amount: amountValue,
        billersCode: meterNumber,
        customerName,
      });
      
      if (success) {
        toast.success("Water bill paid successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Water bill payment error:", error);
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
          <h1 className="text-2xl font-bold">Pay Water Bill</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <form onSubmit={handlePayWaterBill} className="space-y-6">
            <div className="space-y-2">
              <Label>Select Water Provider</Label>
              <div className="grid grid-cols-2 gap-3">
                {waterProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      selectedProvider === provider.id
                        ? "border-primary"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Droplet className="h-5 w-5 text-blue-500" />
                      <span className="font-medium text-center">{provider.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meterNumber">Meter Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="meterNumber"
                  placeholder="Enter meter number"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value)}
                  className="flex-grow"
                />
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleVerifyMeter}
                  disabled={isVerifying || !meterNumber || !selectedProvider}
                >
                  {isVerifying ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Verify
                </Button>
              </div>
            </div>
            
            {customerName && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Customer Name</p>
                <p className="text-lg font-semibold">{customerName}</p>
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
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[1000, 2000, 5000, 10000].map((amt) => (
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
              disabled={isLoading || !amount || !customerName}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
              Pay Water Bill
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Water;
