
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  Phone, 
  Zap, 
  Tv, 
  ArrowLeft,
  PlusCircle,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface SavedService {
  id: string;
  type: string;
  name: string;
  details: Record<string, string>;
  icon: JSX.Element;
}

const Favorites = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [savedServices, setSavedServices] = useState<SavedService[]>([]);

  const removeSavedService = (id: string) => {
    setSavedServices(prev => prev.filter(service => service.id !== id));
  };

  const serviceTypes = [
    { id: "airtime", name: "Airtime", route: "/bills/airtime", icon: <Phone className="h-5 w-5" /> },
    { id: "electricity", name: "Electricity", route: "/bills/electricity", icon: <Zap className="h-5 w-5" /> },
    { id: "cable", name: "Cable TV", route: "/bills/cable", icon: <Tv className="h-5 w-5" /> },
  ];

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
          <h1 className="text-2xl font-bold">Favorites</h1>
        </div>

        {savedServices.length > 0 ? (
          <div className="space-y-4">
            {savedServices.map((service) => (
              <Card key={service.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {service.icon}
                    </div>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {Object.entries(service.details)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(" • ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={() => removeSavedService(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      Use Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Heart className="h-16 w-16 mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6 max-w-xs">
                Save your frequently used services here for quicker access
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {serviceTypes.map((service) => (
                  <Button 
                    key={service.id}
                    variant="outline"
                    className="flex flex-col h-auto py-3 space-y-2"
                    onClick={() => navigate(service.route)}
                  >
                    <div className="p-2 bg-primary/10 rounded-full">
                      {service.icon}
                    </div>
                    <span className="text-xs">{service.name}</span>
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="flex flex-col h-auto py-3 space-y-2"
                  onClick={() => navigate("/bills")}
                >
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PlusCircle className="h-5 w-5" />
                  </div>
                  <span className="text-xs">More</span>
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">How to add favorites</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-1 rounded-full text-primary flex-shrink-0">1</div>
              <p className="text-sm">Go to any service (Airtime, Data, etc.)</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-1 rounded-full text-primary flex-shrink-0">2</div>
              <p className="text-sm">Fill in all the required details</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-1 rounded-full text-primary flex-shrink-0">3</div>
              <p className="text-sm">Tap the "Add to Favorites" button</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-1 rounded-full text-primary flex-shrink-0">4</div>
              <p className="text-sm">Next time, just select from your favorites list</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Favorites;
