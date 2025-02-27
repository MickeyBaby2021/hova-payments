
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const GiftCards = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  
  const giftCards = [
    { id: "1", name: "Amazon", value: 5000, image: "🛒" },
    { id: "2", name: "iTunes", value: 5000, image: "🎵" },
    { id: "3", name: "Google Play", value: 5000, image: "🎮" },
    { id: "4", name: "Netflix", value: 5000, image: "📺" },
    { id: "5", name: "Spotify", value: 5000, image: "🎧" },
    { id: "6", name: "Steam", value: 5000, image: "🎲" },
  ];

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
          <h1 className="text-2xl font-bold">Gift Cards</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {giftCards.map((card) => (
            <Card key={card.id} className="p-4 hover-effect cursor-pointer">
              <div className="text-center p-4">
                <div className="text-4xl mb-2">{card.image}</div>
                <h3 className="font-semibold">{card.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  From ₦{card.value.toLocaleString()}
                </p>
              </div>
            </Card>
          ))}
        </div>
        
        <p className="text-center text-muted-foreground text-sm">
          More gift card options coming soon!
        </p>
      </div>
    </DashboardLayout>
  );
};

export default GiftCards;
