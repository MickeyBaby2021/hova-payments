import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Zap,
  Loader2,
  AlertTriangle,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { verifyCustomer, payBill, fetchServiceVariations } from "@/services/payment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Electricity = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedDisco, setSelectedDisco] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [meterType, setMeterType] = useState("prepaid");
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const discos = [
    { id: "ikeja-electric", name: "Ikeja Electric", serviceID: "ikeja-electric" },
    { id: "eko-electric", name: "Eko Electric", serviceID: "eko-electric" },
    { id: "abuja-electric", name: "Abuja Electric", serviceID: "abuja-electric" },
    { id: "kano-electric", name: "Kano Electric", serviceID: "kano-electric" },
    { id: "ibadan-electric", name: "Ibadan Electric", serviceID: "ibadan-electric" },
    { id: "ph-electric", name: "Port Harcourt Electric", serviceID: "ph-electric" },
  ];

  const meterTypes = [
    { id: "prepaid", name: "Prepaid" },
    { id: "postpaid", name: "Postpaid" },
  ];

  const verifyMeter = async () => {
    if (!meterNumber || !selectedDisco) {
      toast.error("Please enter meter number and select disco");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const result = await verifyCustomer(selectedDisco, meterNumber, meterType);
      
      if (result.success) {
        setCustomerName(result.customer.name);
        setCustomerAddress(result.customer.address);
        setIsVerified(true);
        toast.success("Customer verified successfully!");
      } else {
        // This will never execute with current implementation, but kept for future API integration
        toast.error("Could not verify customer. Please check the details and try again.");
      }
    } catch (error) {
      console.error("Error verifying meter:", error);
      toast.error("An error occurred while verifying the meter number");
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePayBill = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    
    if (!amountValue || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!selectedDisco) {
      toast.error("Please select a disco");
      return;
    }
    
    if (!meterNumber) {
      toast.error("Please enter meter number");
      return;
    }
    
    if (!customerName) {
      toast.error("Please verify meter number");
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
        toast.error("Invalid disco selected");
        setIsLoading(false);
        return;
      }
      
      const success = await payBill({
        serviceID: disco.serviceID,
        variation_code: meterType,
        amount: amountValue,
        phone: user?.phone || "08012345678",
        billersCode: meterNumber,
      });
      
      if (success) {
        toast.success(`${disco.name} payment successful!`);
        toast("Token details has been sent to your email", {
          description: "Check your email for payment confirmation",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Electricity payment error:", error);
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
          <h1 className="text-2xl font-bold">Electricity Bill</h1>
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
              <Label>Select Disco</Label>
              <Select
                value={selectedDisco}
                onValueChange={setSelectedDisco}
                disabled={isVerifying || isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a disco" />
                </SelectTrigger>
                <SelectContent>
                  {discos.map((disco) => (
                    <SelectItem key={disco.id} value={disco.id}>
                      <div className="flex items-center space-x-2">
                        <Home className="h-4 w-4" />
                        <span>{disco.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Meter Type</Label>
              <Select
                value={meterType}
                onValueChange={setMeterType}
                disabled={isVerifying || isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select meter type" />
                </SelectTrigger>
                <SelectContent>
                  {meterTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meterNumber">Meter Number</Label>
              <Input
                id="meterNumber"
                placeholder="Enter meter number"
                value={meterNumber}
                onChange={(e) => setMeterNumber(e.target.value)}
                disabled={isVerifying || isLoading}
              />
            </div>

            {customerName && (
              <div className="mb-4 p-3 rounded-md bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                <p className="font-medium">Customer Details:</p>
                <p>Name: {customerName}</p>
                <p>Address: {customerAddress}</p>
              </div>
            )}

            <div className="flex justify-between">
              <Button
                type="button"
                onClick={verifyMeter}
                disabled={isVerifying || isLoading || !selectedDisco || !meterNumber}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Meter"
                )}
              </Button>
              {isVerified && !customerName && (
                <div className="text-red-500 mt-2">
                  <AlertTriangle className="h-4 w-4 inline-block mr-1" />
                  Could not verify customer.
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="₦0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !amount || !selectedDisco || !meterNumber || !customerName}
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
