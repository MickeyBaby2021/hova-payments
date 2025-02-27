
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const HotelBooking = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  
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
          <h1 className="text-2xl font-bold">Hotel Booking</h1>
        </div>

        <Card className="p-6 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Coming Soon!</h2>
            <p className="text-muted-foreground mb-6">
              We're working on bringing you the best hotel booking experience.
            </p>
            <Button onClick={() => navigate("/bills")}>
              Back to Services
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HotelBooking;
