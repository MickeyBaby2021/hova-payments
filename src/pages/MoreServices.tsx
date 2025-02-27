
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Settings, Shield, CreditCard, User, HelpCircle, Gift, FileText, Send, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MoreServices = () => {
  const navigate = useNavigate();
  
  const services = [
    { icon: User, name: "Profile Settings", link: "/profile" },
    { icon: Shield, name: "Security", link: "/profile?tab=security" },
    { icon: CreditCard, name: "Cards & Banks", link: "/ewallet" },
    { icon: Settings, name: "Preferences", link: "/preferences" },
    { icon: HelpCircle, name: "Help & Support", link: "/support" },
    { icon: FileText, name: "Statements", link: "/statements" },
    { icon: Gift, name: "Rewards", link: "/rewards" },
    { icon: Send, name: "Refer & Earn", link: "/referrals" },
    { icon: Heart, name: "Favorites", link: "/favorites" },
  ];

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
          <h1 className="text-2xl font-bold">More Services</h1>
        </div>

        <div className="grid gap-4">
          {services.map((service) => (
            <Card
              key={service.name}
              className="p-4 hover-effect cursor-pointer"
              onClick={() => navigate(service.link)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{service.name}</span>
                </div>
                <span className="text-muted-foreground">→</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MoreServices;
