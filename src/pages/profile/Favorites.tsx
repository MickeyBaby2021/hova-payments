
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Heart, Phone, Wifi, Lightbulb, Tv, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";

interface Favorite {
  id: string;
  name: string;
  type: "airtime" | "data" | "electricity" | "cable" | "transfer";
  details: string;
  icon: any;
  color: string;
  path: string;
}

const Favorites = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  
  const [favorites, setFavorites] = useState<Favorite[]>([
    {
      id: "1",
      name: "MTN Airtime (080123456789)",
      type: "airtime",
      details: "₦1,000 recharge",
      icon: Phone,
      color: "bg-yellow-500",
      path: "/bills/airtime"
    },
    {
      id: "2",
      name: "Airtel Data (090123456789)",
      type: "data",
      details: "1GB data plan",
      icon: Wifi,
      color: "bg-red-500",
      path: "/bills/data"
    },
    {
      id: "3",
      name: "IKEDC Electricity",
      type: "electricity",
      details: "Meter: 12345678901",
      icon: Lightbulb,
      color: "bg-blue-500",
      path: "/bills/electricity"
    },
    {
      id: "4",
      name: "DSTV Subscription",
      type: "cable",
      details: "Account: 1234567890",
      icon: Tv,
      color: "bg-purple-500",
      path: "/bills/cable"
    }
  ]);

  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
    toast.success("Removed from favorites");
  };

  const handleUseFavorite = (favorite: Favorite) => {
    // In a real app, this would prepopulate the form on the target page
    navigate(favorite.path);
    
    // Notify for demonstration purposes
    addNotification({
      title: "Using Favorite",
      message: `Navigating to ${favorite.name}`,
      type: "system"
    });
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
          <h1 className="text-2xl font-bold">Favorites</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Saved Favorites</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <Heart className="h-4 w-4 mr-1 text-red-500" />
              <span>{favorites.length} saved</span>
            </div>
          </div>
          
          {favorites.length > 0 ? (
            <div className="space-y-4">
              {favorites.map((favorite) => (
                <div 
                  key={favorite.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`${favorite.color} p-2 rounded-full mr-3`}>
                      <favorite.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{favorite.name}</p>
                      <p className="text-sm text-muted-foreground">{favorite.details}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUseFavorite(favorite)}
                    >
                      Use
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveFavorite(favorite.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-4">
                Save your frequently used services for quick access
              </p>
              <Button onClick={() => navigate("/bills")}>
                Browse Services
              </Button>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">How to Add Favorites</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Use Services Regularly</p>
                <p className="text-sm text-muted-foreground">
                  When using any service, click the heart icon to save it as a favorite
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Quick Access</p>
                <p className="text-sm text-muted-foreground">
                  Access your favorites directly from this page or from the dashboard
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Save Time</p>
                <p className="text-sm text-muted-foreground">
                  Favorites remember your settings, helping you complete transactions faster
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Favorites;
