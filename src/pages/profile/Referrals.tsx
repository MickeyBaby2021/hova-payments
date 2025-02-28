
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Users, Gift, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

const Referrals = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [referralCode] = useState("HOVAPAY123");
  const [referralLink] = useState("https://hovapay.com/ref/HOVAPAY123");

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Referrals</h1>
        </div>

        <Card className="p-6 text-center bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Invite Friends & Earn</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Earn ₦500 bonus for each friend who signs up using your referral code
          </p>
          
          <div className="space-y-4">
            <div className="relative bg-background rounded-lg p-4 border">
              <p className="text-sm text-muted-foreground mb-1">Your Referral Code</p>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold">{referralCode}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(referralCode, "Referral code")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="relative bg-background rounded-lg p-4 border">
              <p className="text-sm text-muted-foreground mb-1">Referral Link</p>
              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm font-medium truncate">{referralLink}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(referralLink, "Referral link")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button className="w-full">
              <Gift className="h-4 w-4 mr-2" />
              Share Referral Code
            </Button>
          </div>
        </Card>
        
        <Card className="p-5">
          <h2 className="text-lg font-medium mb-4">Your Referral Stats</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total Referrals</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Earnings</p>
              <p className="text-2xl font-bold">₦0</p>
            </div>
          </div>
          
          <div className="text-center py-8">
            <div className="bg-muted/50 rounded-full p-4 inline-flex mb-4">
              <Gift className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Referrals Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share your referral code to start earning bonuses
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
