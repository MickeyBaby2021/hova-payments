
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Tv, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { payBill } from "@/services/payment";

const providers = [
  { id: "dstv", name: "DSTV", serviceID: "dstv" },
  { id: "gotv", name: "GOtv", serviceID: "gotv" },
  { id: "startimes", name: "StarTimes", serviceID: "startimes" },
];

const packages = [
  { id: "1", name: "DStv Compact", amount: 8900, provider: "dstv", code: "dstv-compact" },
  { id: "2", name: "DStv Premium", amount: 18900, provider: "dstv", code: "dstv-premium" },
  { id: "3", name: "GOtv Max", amount: 4150, provider: "gotv", code: "gotv-max" },
  { id: "4", name: "StarTimes Basic", amount: 1700, provider: "startimes", code: "startimes-basic" },
];

const CableTV = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const filteredPackages = packages.filter(
    (pkg) => !selectedProvider || pkg.provider === selectedProvider
  );

  const handleVerifySmartCard = () => {
    if (!smartCardNumber || smartCardNumber.length < 5) {
      toast.error("Please enter a valid smart card number");
      return;
    }
    
    if (!selectedProvider) {
      toast.error("Please select a service provider");
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate smart card verification
    setTimeout(() => {
      setCustomerName("John Doe");
      setIsVerifying(false);
      toast.success("Smart card verified successfully");
    }, 2000);
  };

  const handlePaySubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName) {
      toast.error("Please verify smart card first");
      return;
    }
    
    if (!selectedPackage) {
      toast.error("Please select a package");
      return;
    }
    
    const pkg = packages.find(p => p.id === selectedPackage);
    
    if (!pkg) {
      toast.error("Invalid package selected");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First deduct from wallet
      const isDeducted = deductFromBalance(pkg.amount);
      
      if (!isDeducted) {
        setIsLoading(false);
        return;
      }
      
      // Then process VTPass payment
      const provider = providers.find(p => p.id === selectedProvider);
      
      if (!provider) {
        toast.error("Invalid provider selected");
        setIsLoading(false);
        return;
      }
      
      const success = await payBill({
        serviceID: provider.serviceID,
        variation_code: pkg.code,
        amount: pkg.amount,
        phone: user?.email || "",
        billersCode: smartCardNumber,
      });
      
      if (success) {
        toast.success(`${pkg.name} subscription purchased successfully!`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Cable TV subscription error:", error);
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
          <h1 className="text-2xl font-bold">Cable TV Subscription</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <form onSubmit={handlePaySubscription} className="space-y-6">
            <div className="space-y-2">
              <Label>Select Provider</Label>
              <div className="grid grid-cols-3 gap-3">
                {providers.map((provider) => (
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
                      <Tv className="h-5 w-5 text-primary" />
                      <span className="font-medium">{provider.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smartCardNumber">Smart Card Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="smartCardNumber"
                  placeholder="Enter smart card number"
                  value={smartCardNumber}
                  onChange={(e) => setSmartCardNumber(e.target.value)}
                  className="flex-grow"
                />
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleVerifySmartCard}
                  disabled={isVerifying || !smartCardNumber || !selectedProvider}
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
              <Label>Select Package</Label>
              <div className="grid gap-3">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      selectedPackage === pkg.id
                        ? "border-primary"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pkg.name}</span>
                      <span className="font-semibold">₦{pkg.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !customerName || !selectedPackage}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
              Subscribe Now
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CableTV;
