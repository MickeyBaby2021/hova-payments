
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tv,
  Lightbulb,
  Phone,
  Gift,
  Ticket,
  Plane,
  Building2,
  Shield,
  GraduationCap,
} from "lucide-react";

const Dashboard = () => {
  const balance = 50000; // This will be replaced with actual balance
  
  const services = [
    { icon: Phone, name: "Airtime", link: "/bills/airtime" },
    { icon: Phone, name: "Data", link: "/bills/data" },
    { icon: Lightbulb, name: "Electricity", link: "/bills/electricity" },
    { icon: Tv, name: "Cable TV", link: "/bills/cable" },
    { icon: Gift, name: "Gift Cards", link: "/bills/gift-cards" },
    { icon: Ticket, name: "Movie Tickets", link: "/bills/movies" },
    { icon: Plane, name: "Flight Booking", link: "/bills/flights" },
    { icon: Building2, name: "Hotel Booking", link: "/bills/hotels" },
    { icon: Shield, name: "Insurance", link: "/bills/insurance" },
    { icon: GraduationCap, name: "Education", link: "/bills/education" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in">
        {/* Balance Card */}
        <Card className="p-6 glass-card">
          <h2 className="text-lg font-medium mb-2">Wallet Balance</h2>
          <p className="text-3xl font-bold">₦{balance.toLocaleString()}</p>
          <div className="mt-4 flex space-x-4">
            <Button onClick={() => window.location.href = "/wallet"}>
              Fund Wallet
            </Button>
            <Button variant="outline">Transfer</Button>
          </div>
        </Card>

        {/* Services Grid */}
        <div>
          <h2 className="text-lg font-medium mb-4">Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {services.map((service) => (
              <Card
                key={service.name}
                className="p-4 text-center hover-effect cursor-pointer"
                onClick={() => window.location.href = service.link}
              >
                <div className="flex flex-col items-center">
                  <service.icon className="service-icon mb-2" />
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions Preview */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Recent Transactions</h2>
            <Button
              variant="ghost"
              onClick={() => window.location.href = "/transactions"}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {/* We'll add transaction items here */}
            <p className="text-muted-foreground text-center py-4">
              No recent transactions
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
