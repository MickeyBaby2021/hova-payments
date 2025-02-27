
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

const Bills = () => {
  const services = [
    {
      icon: Phone,
      name: "Airtime",
      description: "Buy airtime for any network",
      link: "/bills/airtime",
    },
    {
      icon: Phone,
      name: "Data",
      description: "Purchase data bundles",
      link: "/bills/data",
    },
    {
      icon: Lightbulb,
      name: "Electricity",
      description: "Pay electricity bills",
      link: "/bills/electricity",
    },
    {
      icon: Tv,
      name: "Cable TV",
      description: "Subscribe to TV packages",
      link: "/bills/cable",
    },
    {
      icon: Gift,
      name: "Gift Cards",
      description: "Purchase gift cards",
      link: "/bills/gift-cards",
    },
    {
      icon: Ticket,
      name: "Movie Tickets",
      description: "Book movie tickets",
      link: "/bills/movies",
    },
    {
      icon: Plane,
      name: "Flight Booking",
      description: "Book flight tickets",
      link: "/bills/flights",
    },
    {
      icon: Building2,
      name: "Hotel Booking",
      description: "Book hotel rooms",
      link: "/bills/hotels",
    },
    {
      icon: Shield,
      name: "Insurance",
      description: "Pay insurance premiums",
      link: "/bills/insurance",
    },
    {
      icon: GraduationCap,
      name: "Education",
      description: "Pay school fees",
      link: "/bills/education",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in">
        <h1 className="text-2xl font-bold">Services</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.name}
              className="p-6 hover-effect cursor-pointer"
              onClick={() => window.location.href = service.link}
            >
              <div className="flex items-center space-x-4">
                <service.icon className="service-icon" />
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bills;
