
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lightbulb, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { payBill, fetchServiceVariations, verifyCustomer } from "@/services/payment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const discos = [
  { id: "ikedc", name: "Ikeja Electric", serviceID: "ikeja-electric" },
  { id: "ekedc", name: "Eko Electric", serviceID: "eko-electric" },
  { id: "ibedc", name: "Ibadan Electric", serviceID: "ibadan-electric" },
  { id: "aedc", name: "Abuja Electric", serviceID: "abuja-electric" },
  { id: "phedc", name: "Port Harcourt Electric", serviceID: "phed" },
  { id: "kedc", name: "Kaduna Electric", serviceID: "kaduna-electric" },
  { id: "jedc", name: "Jos Electric", serviceID: "jos-electric" },
  { id: "eedc", name: "Enugu Electric", serviceID: "enugu-electric" },
  { id: "bedc", name: "Benin Electric", serviceID: "benin-electric" },
];

const Electricity = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedDisco, setSelectedDisco] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [meterType, setMeterType] = useState("prepaid");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyMeter = async () => {
    if (!meterNumber || meterNumber.length < 5) {
      toast.error("Please enter a valid meter number");
      return;
    }
    
    if (!selectedDisco) {
      toast.error("Please select a distribution company");
      return;
    }
    
    setIsVerifying(true);
    setCustomerName("");
    setCustomerAddress("");
    
    try {
      const disco = discos.find(d => d.id === selectedDisco);
      
      if (!disco) {
        toast.error("Invalid distribution company selected");
        setIsVerifying(false);
        return;
      }
      
      const result = await verifyCustomer(
        disco.serviceID,
        meterNumber,
        meterType
      );
      
      if (result && result.success) {
        setCustomerName(result.customer.name);
        setCustomerAddress(result.customer.address || "");
        toast.success("Meter verified successfully");
      } else {
        toast.error(result?.message || "Could not verify meter");
      }
    } catch (error) {
      console.error("Meter verification error:", error);
      toast.error("An error occurred while verifying meter");
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePayBill = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    
    if (!amountValue || amountValue < 1000) {
      toast.error("Minimum amount is ₦1,000");
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
      
      // Then process VTPass payment
      const disco = discos.find(d => d.id === selectedDisco);
      
      if (!disco) {
        toast.error("Invalid distribution company selected");
        setIsLoading(false);
        return;
      }
      
      const success = await payBill({
        serviceID: disco.serviceID,
        variation_code: meterType,
        amount: amountValue,
        phone: user?.email || "",
        billersCode: meterNumber,
      });
      
      if (success) {
        toast.success("Electricity token purchased successfully!");
        
        // In a real app, you would display the token here
        // or send it via email/SMS to the user
        toast("Your token will be sent to your phone", {
          description: "Check your SMS for the token details",
        });
        
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Electricity purchase error:", error);
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
          <h1 className="text-2xl font-bold">Pay Electricity Bill</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <form onSubmit={handlePayBill} className="space-y-6">
            <div className="space-y-2">
              <Label>Select Distribution Company</Label>
              <Select 
                value={selectedDisco} 
                onValueChange={setSelectedDisco}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a distribution company" />
                </SelectTrigger>
                <SelectContent>
                  {discos.map((disco) => (
                    <SelectItem key={disco.id} value={disco.id}>
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4" />
                        <span>{disco.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Meter Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                    meterType === "prepaid" ? "border-primary" : "border-border"
                  }`}
                  onClick={() => setMeterType("prepaid")}
                >
                  <span className="font-medium">Prepaid</span>
                </div>
                <div
                  className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                    meterType === "postpaid" ? "border-primary" : "border-border"
                  }`}
                  onClick={() => setMeterType("postpaid")}
                >
                  <span className="font-medium">Postpaid</span>
                </div>
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
                  disabled={isVerifying || !meterNumber || !selectedDisco}
                >
                  {isVerifying ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Verify
                </Button>
              </div>
            </div>
            
            {customerName && (
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="text-lg font-semibold">{customerName}</p>
                </div>
                
                {customerAddress && (
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="text-sm">{customerAddress}</p>
                  </div>
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
                {[1000, 2000, 5000].map((amt) => (
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

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md flex items-start space-x-2 text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Important Note</p>
                <p className="text-xs mt-1">After payment, your token will be sent via SMS to your registered phone number.</p>
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
              Pay Now
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Electricity;
