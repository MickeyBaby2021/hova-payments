
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  CreditCard, 
  Copy, 
  Clock, 
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const EWallet = () => {
  const navigate = useNavigate();
  const { user, showBalance, toggleBalanceVisibility } = useUser();
  const [virtualAccountDetails] = useState({
    accountNumber: "9102045738",
    accountName: user?.name,
    bankName: "HovaPay Microfinance Bank"
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
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
          <h1 className="text-2xl font-bold">E-Wallet</h1>
        </div>

        <Card className="p-6 light-purple-card relative">
          <div className="flex items-center space-x-4 mb-4">
            <CreditCard className="h-8 w-8" />
            <div>
              <p className="text-sm text-card-foreground/80">Wallet Balance</p>
              <p className="text-3xl font-bold">
                {showBalance 
                  ? `₦${user?.balance.toLocaleString()}`
                  : "₦•••••••"
                }
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary/70 hover:text-primary hover:bg-primary/10 absolute right-3 top-3"
              onClick={toggleBalanceVisibility}
            >
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button onClick={() => navigate("/wallet")} className="w-full">
            Fund Wallet
          </Button>
        </Card>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="account">Virtual Account</TabsTrigger>
            <TabsTrigger value="cards">Debit Cards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Your Virtual Account</h2>
                <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs py-1 px-2 rounded-full">
                  Active
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Account Number</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => handleCopy(virtualAccountDetails.accountNumber)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xl font-bold">{virtualAccountDetails.accountNumber}</p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Account Name</p>
                  <p className="text-lg font-semibold">{virtualAccountDetails.accountName}</p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Bank Name</p>
                  <p className="text-lg font-semibold">{virtualAccountDetails.bankName}</p>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <p>Your virtual account is secure and ready to receive transfers</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="cards">
            <Card className="p-6 text-center">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No Cards Added Yet</h2>
                <p className="text-muted-foreground mb-6">
                  Add a debit card to easily fund your wallet
                </p>
                <Button>
                  Add New Card
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Account Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Account Credited</p>
                  <p className="text-xs text-muted-foreground">Today, 2:30 PM</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">+₦5,000</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Account Activated</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 10:15 AM</p>
                </div>
              </div>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                System
              </span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EWallet;
