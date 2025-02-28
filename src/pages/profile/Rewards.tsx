
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Gift, Award, Star, Sparkles, InfoIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  category: string;
  expiry?: string;
}

const Rewards = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [points, setPoints] = useState(350);
  const [showRewardDetails, setShowRewardDetails] = useState<string | null>(null);
  
  const rewards: Reward[] = [
    {
      id: "1",
      name: "₦500 Cashback",
      description: "Get ₦500 added to your wallet balance",
      pointsRequired: 200,
      category: "cashback",
      expiry: "Dec 31, 2023"
    },
    {
      id: "2",
      name: "Free Bank Transfer",
      description: "Free bank transfer fees for 5 transactions",
      pointsRequired: 300,
      category: "discount"
    },
    {
      id: "3",
      name: "50% Off Airtime Purchase",
      description: "Get 50% discount on your next airtime purchase",
      pointsRequired: 400,
      category: "discount"
    },
    {
      id: "4",
      name: "₦1,000 Cashback",
      description: "Get ₦1,000 added to your wallet balance",
      pointsRequired: 500,
      category: "cashback"
    },
    {
      id: "5",
      name: "Free Data Bundle",
      description: "Get a free 1GB data bundle on any network",
      pointsRequired: 600,
      category: "subscription"
    }
  ];

  const handleRedeemReward = (reward: Reward) => {
    if (points < reward.pointsRequired) {
      toast.error("Not enough points to redeem this reward");
      return;
    }
    
    setPoints(prev => prev - reward.pointsRequired);
    toast.success(`Successfully redeemed ${reward.name}`);
    
    addNotification({
      title: "Reward Redeemed",
      message: `You have successfully redeemed ${reward.name}`,
      type: "system"
    });
  };

  const toggleRewardDetails = (id: string) => {
    if (showRewardDetails === id) {
      setShowRewardDetails(null);
    } else {
      setShowRewardDetails(id);
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
          <h1 className="text-2xl font-bold">Rewards & Loyalty</h1>
        </div>

        {/* Points Summary */}
        <Card className="purple-card p-6">
          <div className="text-center mb-4">
            <Sparkles className="h-10 w-10 mx-auto mb-2" />
            <h2 className="text-2xl font-bold">{points} Points</h2>
            <p className="text-sm text-white/80">Your current reward points balance</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Silver Tier</p>
              <p className="text-sm font-medium">Gold Tier</p>
            </div>
            <Progress value={30} className="h-2 bg-white/20" />
            <div className="flex justify-between items-center text-sm text-white/80">
              <p>Current: Silver</p>
              <p>170 more points to Gold</p>
            </div>
          </div>
        </Card>

        {/* Ways to Earn */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Ways to Earn Points</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                  <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Complete Your Profile</p>
                  <p className="text-sm text-muted-foreground">Add all your personal information</p>
                </div>
              </div>
              <div className="text-center">
                <span className="block text-primary font-bold">+50</span>
                <span className="text-xs text-muted-foreground">points</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                  <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">First Transaction</p>
                  <p className="text-sm text-muted-foreground">Make your first payment or transfer</p>
                </div>
              </div>
              <div className="text-center">
                <span className="block text-primary font-bold">+100</span>
                <span className="text-xs text-muted-foreground">points</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                  <Gift className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Refer a Friend</p>
                  <p className="text-sm text-muted-foreground">Invite friends to join HovaPay</p>
                </div>
              </div>
              <div className="text-center">
                <span className="block text-primary font-bold">+200</span>
                <span className="text-xs text-muted-foreground">points</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Available Rewards */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Available Rewards</h2>
          
          <div className="space-y-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleRewardDetails(reward.id)}
                >
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{reward.name}</p>
                      <p className="text-sm text-muted-foreground">{reward.pointsRequired} points required</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {reward.expiry && (
                      <span className="text-xs text-muted-foreground mr-2">
                        Expires: {reward.expiry}
                      </span>
                    )}
                    {showRewardDetails === reward.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>
                
                {showRewardDetails === reward.id && (
                  <div className="p-4 bg-muted/50 border-t">
                    <p className="text-sm mb-4">{reward.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <InfoIcon className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">
                          {reward.category === "cashback" ? "Cashback will be credited within 24 hours" :
                           reward.category === "discount" ? "Discount will be automatically applied" :
                           "Subscription will be activated immediately"}
                        </span>
                      </div>
                      
                      <Button 
                        size="sm"
                        onClick={() => handleRedeemReward(reward)}
                        disabled={points < reward.pointsRequired}
                      >
                        Redeem
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Rewards;
