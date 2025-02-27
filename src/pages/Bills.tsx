
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import {
  Tv,
  Lightbulb,
  Phone,
  Gift,
  Ticket,
  Plane,
  Building2,
  ShieldCheck,
  GraduationCap,
  Wifi,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Bills = () => {
  const { user } = useUser();
  
  const allServices = [
    {
      icon: Phone,
      name: "Airtime",
      description: "Buy airtime for any network",
      link: "/bills/airtime",
      category: "utilities",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Wifi,
      name: "Data",
      description: "Purchase data bundles",
      link: "/bills/data",
      category: "utilities",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: Lightbulb,
      name: "Electricity",
      description: "Pay electricity bills",
      link: "/bills/electricity",
      category: "utilities",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: Tv,
      name: "Cable TV",
      description: "Subscribe to TV packages",
      link: "/bills/cable",
      category: "utilities",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Gift,
      name: "Gift Cards",
      description: "Purchase gift cards",
      link: "/bills/gift-cards",
      category: "lifestyle",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Ticket,
      name: "Movie Tickets",
      description: "Book movie tickets",
      link: "/bills/movies",
      category: "lifestyle",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Plane,
      name: "Flight Booking",
      description: "Book flight tickets",
      link: "/bills/flights",
      category: "travel",
      color: "bg-sky-100 text-sky-600",
    },
    {
      icon: Building2,
      name: "Hotel Booking",
      description: "Book hotel rooms",
      link: "/bills/hotels",
      category: "travel",
      color: "bg-teal-100 text-teal-600",
    },
    {
      icon: ShieldCheck,
      name: "Insurance",
      description: "Pay insurance premiums",
      link: "/bills/insurance",
      category: "financial",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: GraduationCap,
      name: "Education",
      description: "Pay school fees",
      link: "/bills/education",
      category: "financial",
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 fade-in max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Services</h1>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search services" className="pl-9" />
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Wallet Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="utilities">Utilities</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="travel">Travel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-2 gap-3">
              {allServices.map((service) => (
                <Card
                  key={service.name}
                  className="p-4 hover-effect cursor-pointer"
                  onClick={() => window.location.href = service.link}
                >
                  <div className="flex flex-col">
                    <div className={`p-3 rounded-full ${service.color} w-fit mb-3`}>
                      <service.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {["utilities", "lifestyle", "travel", "financial"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 gap-3">
                {allServices
                  .filter((service) => service.category === category)
                  .map((service) => (
                    <Card
                      key={service.name}
                      className="p-4 hover-effect cursor-pointer"
                      onClick={() => window.location.href = service.link}
                    >
                      <div className="flex flex-col">
                        <div className={`p-3 rounded-full ${service.color} w-fit mb-3`}>
                          <service.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Bills;
