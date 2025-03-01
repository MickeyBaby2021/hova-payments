
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Wifi, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { payBill } from "@/services/payment";

const internetProviders = [
  { id: "spectranet", name: "Spectranet", serviceID: "spectranet" },
  { id: "smile", name: "Smile", serviceID: "smile" },
  { id: "swift", name: "Swift", serviceID: "swift" },
  { id: "ipnx", name: "IPNX", serviceID: "ipnx" },
];

const packages = [
  { id: "1", name: "5GB - 1 Month", amount: 5000, provider: "spectranet", code: "spectranet-5gb" },
  { id: "2", name: "10GB - 1 Month", amount: 8000, provider: "spectranet", code: "spectranet-10gb" },
  { id: "3", name: "7GB - 1 Month", amount: 5000, provider: "smile", code: "smile-7gb" },
  { id: "4", name: "10GB - 1 Month", amount: 7500, provider: "smile", code: "smile-10gb" },
  { id: "5", name: "Unlimited (30 Days)", amount: 16000, provider: "swift", code: "swift-unlimited" },
  { id: "6", name: "10Mbps - 30 Days", amount: 18000, provider: "ipnx", code: "ipnx-10mbps" },
];

const Internet = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const filteredPackages = packages.filter(
    (pkg) => !selectedProvider || pkg.provider === selectedProvider
  );

  const handleVerifyAccount = () => {
    if (!accountNumber || accountNumber.length < 5) {
      toast.error("Please enter a valid account number");
      return;
    }
    
    if (!selectedProvider) {
      toast.error("Please select a service provider");
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate account verification
    setTimeout(() => {
      setCustomerName("John Doe");
      setIsVerifying(false);
      toast.success("Account verified successfully");
    }, 2000);
  };

  const handlePayInternet = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName) {
      toast.error("Please verify account first");
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
      
      // Then process payment
      const provider = internetProviders.find(p => p.id === selectedProvider);
      
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
        billersCode: accountNumber,
      });
      
      if (success) {
        toast.success(`${pkg.name} subscription purchased successfully!`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Internet subscription error:", error);
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
          <h1 className="text-2xl font-bold">Internet Subscription</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Card className="p-6 purple-card">
          <form onSubmit={handlePayInternet} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Select Provider</Label>
              <div className="grid grid-cols-2 gap-3">
                {internetProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className={`p-4 rounded-lg cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all ${
                      selectedProvider === provider.id
                        ? "border-2 border-white"
                        : "border border-white/30"
                    }`}
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Wifi className="h-5 w-5 text-white" />
                      <span className="font-medium text-white">{provider.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-white">Account/Customer ID</Label>
              <div className="flex space-x-2">
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="flex-grow bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleVerifyAccount}
                  disabled={isVerifying || !accountNumber || !selectedProvider}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  {isVerifying ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Verify
                </Button>
              </div>
            </div>
            
            {customerName && (
              <div className="bg-white/20 p-4 rounded-lg">
                <p className="text-sm text-white/80">Customer Name</p>
                <p className="text-lg font-semibold text-white">{customerName}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="text-white">Select Package</Label>
              <div className="grid gap-3">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-4 rounded-lg cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all ${
                      selectedPackage === pkg.id
                        ? "border-2 border-white"
                        : "border border-white/30"
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{pkg.name}</span>
                      <span className="font-semibold text-white">₦{pkg.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-white text-primary hover:bg-white/90" 
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

export default Internet;
