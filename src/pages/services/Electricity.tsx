
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Zap, Search, AlertCircle, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { verifyCustomer, payBill } from "@/services/payment";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { useNotifications } from "@/context/NotificationContext";

const electricityProviders = [
  { id: 'ikeja-electric', name: 'Ikeja Electric', logo: '/ikeja-electric.png' },
  { id: 'eko-electric', name: 'Eko Electric', logo: '/eko-electric.png' },
  { id: 'kano-electric', name: 'Kano Electric', logo: '/kano-electric.png' },
  { id: 'abuja-electric', name: 'Abuja Electric', logo: '/abuja-electric.png' },
  { id: 'ibadan-electric', name: 'Ibadan Electric', logo: '/ibadan-electric.png' },
  { id: 'enugu-electric', name: 'Enugu Electric', logo: '/enugu-electric.png' },
  { id: 'portharcourt-electric', name: 'Port Harcourt Electric', logo: '/ph-electric.png' },
  { id: 'kaduna-electric', name: 'Kaduna Electric', logo: '/kaduna-electric.png' },
];

interface VerifiedCustomer {
  name: string;
  address: string;
  accountNumber: string;
}

const Electricity = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [provider, setProvider] = useState<string>("");
  const [meterNumber, setMeterNumber] = useState<string>("");
  const [meterType, setMeterType] = useState<"prepaid" | "postpaid">("prepaid");
  const [amount, setAmount] = useState<string>("");
  const [customer, setCustomer] = useState<VerifiedCustomer | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const { user } = useUser();
  const { addNotification } = useNotifications();
  
  const handleVerifyMeter = async () => {
    if (!provider || !meterNumber) {
      toast.error("Please select a provider and enter meter number");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const result = await verifyCustomer(provider, meterNumber, meterType);
      
      if (result.success && result.customer) {
        setCustomer(result.customer);
        setStep(2);
        toast.success("Meter verified successfully");
      } else {
        toast.error("Could not verify meter number. Please check and try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Meter verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handlePayment = async () => {
    if (!amount || parseFloat(amount) < 500) {
      toast.error("Please enter an amount (minimum ₦500)");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const payload = {
        serviceID: provider,
        billersCode: meterNumber,
        variation_code: meterType,
        amount,
        phone: user?.phoneNumber || "", // Use phoneNumber instead of phone
        customerName: customer?.name
      };
      
      const success = await payBill(payload);
      
      if (success) {
        toast.success("Payment successful! Your meter will be credited shortly.");
        
        // Add notification
        addNotification({
          title: "Electricity Bill Payment",
          message: `You have successfully purchased ${amount} electricity units for ${customer?.name}`,
          type: "transaction"
        });
        
        // Navigate back
        setTimeout(() => {
          navigate("/bills");
        }, 2000);
      } else {
        toast.error("Payment failed. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while processing your payment.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in">
        <div className="flex items-center mb-6">
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
        
        {step === 1 && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="provider">Select Provider</Label>
                  <Select value={provider} onValueChange={setProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select electricity provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {electricityProviders.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meterType">Meter Type</Label>
                  <RadioGroup
                    value={meterType}
                    onValueChange={(value) => setMeterType(value as "prepaid" | "postpaid")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prepaid" id="prepaid" />
                      <Label htmlFor="prepaid">Prepaid</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="postpaid" id="postpaid" />
                      <Label htmlFor="postpaid">Postpaid</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meterNumber">Meter Number</Label>
                  <div className="relative">
                    <Input
                      id="meterNumber"
                      placeholder="Enter meter number"
                      value={meterNumber}
                      onChange={(e) => setMeterNumber(e.target.value)}
                    />
                    {meterNumber.length > 0 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        onClick={() => setMeterNumber("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleVerifyMeter}
                  disabled={isVerifying || !provider || !meterNumber}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Verify Meter
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {step === 2 && customer && (
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/50">
                <div className="flex items-start">
                  <div className="mr-3 bg-green-100 dark:bg-green-900/50 rounded-full p-1">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800 dark:text-green-300">Customer Verified</h3>
                    <p className="text-sm text-green-700 dark:text-green-400">{customer.name}</p>
                    <p className="text-sm text-green-700 dark:text-green-400">{customer.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Minimum amount: ₦500</p>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Service Charge</span>
                    <span className="text-sm">₦100.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₦{amount ? (parseFloat(amount) + 100).toFixed(2) : "0.00"}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button 
                    onClick={handlePayment} 
                    disabled={isProcessing || !amount || parseFloat(amount) < 500}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Pay Now
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setStep(1);
                      setCustomer(null);
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Electricity;
