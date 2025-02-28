
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Phone, Loader2, Wifi, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { payBill, fetchServiceVariations } from "@/services/payment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataPlan {
  variation_code: string;
  name: string;
  amount: number;
  validity: string;
}

const networkProviders = [
  { id: "mtn", name: "MTN", color: "bg-yellow-500", serviceID: "mtn-data" },
  { id: "airtel", name: "Airtel", color: "bg-red-500", serviceID: "airtel-data" },
  { id: "glo", name: "Glo", color: "bg-green-500", serviceID: "glo-data" },
  { id: "9mobile", name: "9Mobile", color: "bg-green-400", serviceID: "9mobile-data" },
];

const Data = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [dataPlans, setDataPlans] = useState<DataPlan[]>([]);

  useEffect(() => {
    if (selectedNetwork) {
      const network = networkProviders.find(n => n.id === selectedNetwork);
      if (network) {
        loadDataPlans(network.serviceID);
      }
    }
  }, [selectedNetwork]);

  const loadDataPlans = async (serviceID: string) => {
    setIsLoadingPlans(true);
    setSelectedPlan("");
    
    try {
      const plans = await fetchServiceVariations(serviceID);
      if (plans && plans.length > 0) {
        setDataPlans(plans as DataPlan[]);
      } else {
        toast.error("Could not load data plans");
        setDataPlans([]);
      }
    } catch (error) {
      console.error("Error loading data plans:", error);
      toast.error("Failed to load data plans");
      setDataPlans([]);
    } finally {
      setIsLoadingPlans(false);
    }
  };

  const handleBuyData = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    if (!selectedNetwork) {
      toast.error("Please select a network provider");
      return;
    }
    
    if (!selectedPlan) {
      toast.error("Please select a data plan");
      return;
    }
    
    const plan = dataPlans.find(p => p.variation_code === selectedPlan);
    
    if (!plan) {
      toast.error("Invalid plan selected");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First deduct from wallet
      const isDeducted = deductFromBalance(plan.amount);
      
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
        variation_code: plan.variation_code,
        amount: plan.amount,
        phone: phoneNumber,
      });
      
      if (success) {
        toast.success(`${plan.name} data purchased successfully!`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Data purchase error:", error);
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
          <h1 className="text-2xl font-bold">Buy Data</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <form onSubmit={handleBuyData} className="space-y-6">
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
              <Label>Select Data Plan</Label>
              {isLoadingPlans ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : dataPlans.length === 0 ? (
                <div className="p-6 text-center">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    {selectedNetwork 
                      ? "No data plans available for this provider" 
                      : "Select a network provider to view data plans"}
                  </p>
                </div>
              ) : (
                <Select 
                  value={selectedPlan} 
                  onValueChange={setSelectedPlan}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a data plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataPlans.map((plan) => (
                      <SelectItem key={plan.variation_code} value={plan.variation_code}>
                        <div className="flex justify-between items-center w-full">
                          <span>{plan.name}</span>
                          <span className="font-semibold">₦{plan.amount}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {selectedPlan && (
                <div className="bg-muted p-3 rounded-md mt-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Selected Plan:</span>
                    <span className="text-sm font-medium">
                      {dataPlans.find(p => p.variation_code === selectedPlan)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm">Validity:</span>
                    <span className="text-sm font-medium">
                      {dataPlans.find(p => p.variation_code === selectedPlan)?.validity}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm">Amount:</span>
                    <span className="text-sm font-medium">
                      ₦{dataPlans.find(p => p.variation_code === selectedPlan)?.amount}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !phoneNumber || !selectedNetwork || !selectedPlan}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
              Buy Data
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Data;
