
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WalletIcon } from "lucide-react";

const Wallet = () => {
  const balance = 50000; // This will be replaced with actual balance

  const handleMonnifyPayment = () => {
    // Monnify integration will go here
    console.log("Initiating Monnify payment...");
  };

  const handleFlutterwavePayment = () => {
    // Flutterwave integration will go here
    console.log("Initiating Flutterwave payment...");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in">
        <h1 className="text-2xl font-bold">Wallet</h1>

        {/* Balance Card */}
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-4 mb-4">
            <WalletIcon className="h-8 w-8" />
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-3xl font-bold">₦{balance.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 hover-effect">
            <h2 className="text-xl font-semibold mb-4">Fund with Monnify</h2>
            <p className="text-muted-foreground mb-4">
              Securely fund your wallet using Monnify payment gateway
            </p>
            <Button onClick={handleMonnifyPayment} className="w-full">
              Fund with Monnify
            </Button>
          </Card>

          <Card className="p-6 hover-effect">
            <h2 className="text-xl font-semibold mb-4">Fund with Flutterwave</h2>
            <p className="text-muted-foreground mb-4">
              Quick and secure payments powered by Flutterwave
            </p>
            <Button onClick={handleFlutterwavePayment} className="w-full">
              Fund with Flutterwave
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
