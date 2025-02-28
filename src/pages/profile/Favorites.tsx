
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bookmark, ArrowLeft, Phone, Wifi, Tv, Zap, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const navigate = useNavigate();
  
  // Mock favorite services
  const favoriteServices = [
    {
      id: 1,
      name: "MTN Airtime - 08012345678",
      icon: <Phone className="h-4 w-4" />,
      path: "/bills/airtime",
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30",
    },
    {
      id: 2,
      name: "Airtel Data - 09087654321",
      icon: <Wifi className="h-4 w-4" />,
      path: "/bills/data",
      color: "bg-red-100 text-red-600 dark:bg-red-900/30",
    },
    {
      id: 3,
      name: "DSTV Premium - 12345678",
      icon: <Tv className="h-4 w-4" />,
      path: "/bills/cable",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
    },
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

        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Bookmark className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Saved Services</h2>
              <p className="text-sm text-muted-foreground">
                Access your frequently used services quickly
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {favoriteServices.map((service) => (
              <div 
                key={service.id}
                className="flex items-center justify-between border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => navigate(service.path)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${service.color}`}>
                    {service.icon}
                  </div>
                  <span className="font-medium">{service.name}</span>
                </div>
                <Button variant="ghost" size="sm">
                  Use
                </Button>
              </div>
            ))}
            
            <div className="flex items-center justify-between border border-dashed rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer mt-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-muted">
                  <PlusCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="font-medium">Add New Favorite</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">How to Add Favorites</h2>
          
          <div className="space-y-4">
            <div className="flex space-x-3">
              <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Use a service</p>
                <p className="text-sm text-muted-foreground">
                  Complete any transaction like buying airtime or paying bills
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Save as favorite</p>
                <p className="text-sm text-muted-foreground">
                  Click on "Save as favorite" before or after completing the transaction
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Access anytime</p>
                <p className="text-sm text-muted-foreground">
                  Your saved services will appear here for quick access
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
