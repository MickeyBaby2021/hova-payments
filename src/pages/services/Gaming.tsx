
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Gamepad2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { payBill } from "@/services/payment";

const gamingPlatforms = [
  { id: "xbox", name: "Xbox", logo: "💚", serviceID: "xbox" },
  { id: "playstation", name: "PlayStation", logo: "💙", serviceID: "playstation" },
  { id: "steamwallet", name: "Steam", logo: "⚙️", serviceID: "steam" },
  { id: "roblox", name: "Roblox", logo: "🎮", serviceID: "roblox" },
];

const packages = [
  { id: "1", name: "Xbox Game Pass (1 Month)", amount: 4500, platform: "xbox", code: "xbox-gamepass-1m" },
  { id: "2", name: "Xbox Live Gold (3 Months)", amount: 10000, platform: "xbox", code: "xbox-gold-3m" },
  { id: "3", name: "PlayStation Plus (1 Month)", amount: 4000, platform: "playstation", code: "ps-plus-1m" },
  { id: "4", name: "PlayStation Gift Card ($10)", amount: 7500, platform: "playstation", code: "ps-gift-10" },
  { id: "5", name: "Steam Wallet ($10)", amount: 7500, platform: "steamwallet", code: "steam-10" },
  { id: "6", name: "Steam Wallet ($20)", amount: 15000, platform: "steamwallet", code: "steam-20" },
  { id: "7", name: "Roblox 400 Robux", amount: 3000, platform: "roblox", code: "roblox-400" },
  { id: "8", name: "Roblox 800 Robux", amount: 5500, platform: "roblox", code: "roblox-800" },
];

const Gaming = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [gamerId, setGamerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredPackages = packages.filter(
    (pkg) => !selectedPlatform || pkg.platform === selectedPlatform
  );

  const handleBuyGamingPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gamerId) {
      toast.error("Please enter your gaming ID/email");
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
      const platform = gamingPlatforms.find(p => p.id === selectedPlatform);
      
      if (!platform) {
        toast.error("Invalid platform selected");
        setIsLoading(false);
        return;
      }
      
      const success = await payBill({
        serviceID: platform.serviceID,
        variation_code: pkg.code,
        amount: pkg.amount,
        gamerId: gamerId,
      });
      
      if (success) {
        toast.success(`${pkg.name} purchased successfully!`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Gaming purchase error:", error);
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
          <h1 className="text-2xl font-bold">Gaming</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Card className="p-6 light-purple-card">
          <form onSubmit={handleBuyGamingPackage} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Select Gaming Platform</Label>
              <div className="grid grid-cols-2 gap-3">
                {gamingPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`p-4 rounded-lg cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all ${
                      selectedPlatform === platform.id
                        ? "border-2 border-white"
                        : "border border-white/30"
                    }`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-2xl">{platform.logo}</span>
                      <span className="font-medium text-white">{platform.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gamerId" className="text-white">Gaming ID / Email</Label>
              <Input
                id="gamerId"
                placeholder="Enter your gaming ID or email"
                value={gamerId}
                onChange={(e) => setGamerId(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
            </div>
            
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
              disabled={isLoading || !gamerId || !selectedPackage}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
              Purchase
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Gaming;
