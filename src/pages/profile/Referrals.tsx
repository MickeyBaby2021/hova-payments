
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Share2, 
  Copy, 
  Users, 
  Gift,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Referrals = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [referralCode] = useState("HOVA" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const referralLink = `https://hovapay.app/ref/${referralCode}`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join me on HovaPay',
          text: `Use my referral code ${referralCode} to sign up on HovaPay and get a bonus!`,
          url: referralLink,
        });
      } else {
        handleCopy(referralLink, "Referral link");
      }
    } catch (error) {
      console.error('Error sharing:', error);
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
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Referrals</h1>
        </div>

        <Card className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <Users className="h-12 w-12 mx-auto text-primary" />
            <h2 className="text-xl font-semibold">Invite Friends & Earn</h2>
            <p className="text-sm text-muted-foreground">
              Share your referral code with friends and earn ₦500 when they sign up and fund their wallet.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Your Referral Code</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted p-3 rounded-md font-mono text-center">
                  {referralCode}
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleCopy(referralCode, "Referral code")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Referral Link</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted p-3 rounded-md text-sm truncate">
                  {referralLink}
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleCopy(referralLink, "Referral link")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button className="w-full" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Referral Link
            </Button>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Referral Stats</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">₦0</p>
              <p className="text-sm text-muted-foreground">Earnings</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Referral History</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Gift className="h-12 w-12 mb-3 opacity-50" />
            <p>No referral history yet</p>
            <p className="text-sm mt-1">When friends use your code, they'll appear here</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
