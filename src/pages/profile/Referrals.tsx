
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Share2, Copy, UserPlus, Gift, Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";

interface Referral {
  id: string;
  name: string;
  date: string;
  status: "pending" | "completed";
  pointsEarned?: number;
}

const Referrals = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [referralCode] = useState("JOHN7425");
  const [referralLink] = useState("https://hovapay.com/r/JOHN7425");
  const [showCopied, setShowCopied] = useState<"code" | "link" | null>(null);
  
  const referrals: Referral[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      date: "Nov 15, 2023",
      status: "completed",
      pointsEarned: 200
    },
    {
      id: "2",
      name: "Michael Brown",
      date: "Nov 10, 2023",
      status: "pending"
    },
    {
      id: "3",
      name: "Emily Wilson",
      date: "Oct 28, 2023",
      status: "completed",
      pointsEarned: 200
    },
    {
      id: "4",
      name: "David Thompson",
      date: "Oct 12, 2023",
      status: "completed",
      pointsEarned: 200
    }
  ];

  const handleCopy = (text: string, type: "code" | "link") => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setShowCopied(type);
        setTimeout(() => setShowCopied(null), 2000);
        toast.success(`${type === "code" ? "Referral code" : "Referral link"} copied to clipboard`);
      })
      .catch(() => {
        toast.error("Failed to copy. Please try again.");
      });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join HovaPay",
        text: "Sign up on HovaPay using my referral code and get a bonus on your first transaction!",
        url: referralLink
      })
      .then(() => {
        toast.success("Shared successfully");
      })
      .catch((error) => {
        console.error("Error sharing:", error);
        toast.error("Failed to share. Please try again.");
      });
    } else {
      handleCopy(referralLink, "link");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-3xl mx-auto">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Refer & Earn</h1>
        </div>

        {/* Referral Banner */}
        <Card className="purple-card p-6">
          <div className="text-center mb-6">
            <Gift className="h-12 w-12 mx-auto mb-2" />
            <h2 className="text-2xl font-bold">Get 200 Points</h2>
            <p className="text-white/80">For every friend that signs up and completes their first transaction</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Your Referral Code</p>
              <div className="flex">
                <Input
                  value={referralCode}
                  readOnly
                  className="bg-white/20 border-white/20 text-white"
                />
                <Button
                  variant="secondary"
                  className="ml-2 px-3"
                  onClick={() => handleCopy(referralCode, "code")}
                >
                  {showCopied === "code" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Your Referral Link</p>
              <div className="flex">
                <Input
                  value={referralLink}
                  readOnly
                  className="bg-white/20 border-white/20 text-white"
                />
                <Button
                  variant="secondary"
                  className="ml-2 px-3"
                  onClick={() => handleCopy(referralLink, "link")}
                >
                  {showCopied === "link" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share with Friends
            </Button>
          </div>
        </Card>

        {/* Referral Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <UserPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-1">Total Referrals</h3>
            <p className="text-2xl font-bold">{referrals.length}</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-1">Completed</h3>
            <p className="text-2xl font-bold">{referrals.filter(r => r.status === "completed").length}</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-1">Points Earned</h3>
            <p className="text-2xl font-bold">{referrals.reduce((total, ref) => total + (ref.pointsEarned || 0), 0)}</p>
          </Card>
        </div>

        {/* Referral History */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Referral History</h2>
          
          <div className="space-y-4">
            {referrals.length > 0 ? (
              referrals.map((referral) => (
                <div 
                  key={referral.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      referral.status === "completed" 
                        ? "bg-green-100 dark:bg-green-900/30" 
                        : "bg-yellow-100 dark:bg-yellow-900/30"
                    }`}>
                      <UserPlus className={`h-5 w-5 ${
                        referral.status === "completed" 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-yellow-600 dark:text-yellow-400"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-sm text-muted-foreground">Referred on {referral.date}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-medium ${
                      referral.status === "completed" 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}>
                      {referral.status === "completed" ? "Completed" : "Pending"}
                    </p>
                    {referral.pointsEarned && (
                      <p className="text-sm text-muted-foreground">
                        +{referral.pointsEarned} points
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">You haven't referred anyone yet</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
