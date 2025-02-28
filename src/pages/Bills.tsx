
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
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
  Globe,
  Smartphone,
  Droplet,
  CreditCard,
  Gamepad2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Bills = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      category: "Mobile",
      items: [
        { icon: Phone, name: "Airtime", link: "/bills/airtime", color: "bg-blue-500" },
        { icon: Wifi, name: "Data", link: "/bills/data", color: "bg-purple-500" },
      ]
    },
    {
      category: "Utilities",
      items: [
        { icon: Lightbulb, name: "Electricity", link: "/bills/electricity", color: "bg-yellow-500" },
        { icon: Tv, name: "Cable TV", link: "/bills/cable", color: "bg-red-500" },
        { icon: Droplet, name: "Water", link: "/bills/water", color: "bg-blue-400" },
        { icon: Globe, name: "Internet", link: "/bills/internet", color: "bg-green-500" },
      ]
    },
    {
      category: "Entertainment",
      items: [
        { icon: Ticket, name: "Movies", link: "/bills/movies", color: "bg-indigo-500" },
        { icon: Gift, name: "Gift Cards", link: "/bills/gift-cards", color: "bg-pink-500" },
        { icon: Gamepad2, name: "Gaming", link: "/bills/gaming", color: "bg-purple-600" },
      ]
    },
    {
      category: "Travel & Accommodation",
      items: [
        { icon: Plane, name: "Flights", link: "/bills/flights", color: "bg-blue-600" },
        { icon: Building2, name: "Hotels", link: "/bills/hotels", color: "bg-green-600" },
      ]
    },
    {
      category: "Financial Services",
      items: [
        { icon: ShieldCheck, name: "Insurance", link: "/bills/insurance", color: "bg-teal-500" },
        { icon: CreditCard, name: "Betting", link: "/bills/betting", color: "bg-orange-500" },
      ]
    },
    {
      category: "Education",
      items: [
        { icon: GraduationCap, name: "School Fees", link: "/bills/education", color: "bg-amber-500" },
      ]
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 fade-in max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Services</h1>
        
        {services.map((category) => (
          <div key={category.category} className="space-y-4">
            <h2 className="text-lg font-semibold">{category.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {category.items.map((service) => (
                <Card
                  key={service.name}
                  className="p-4 hover-effect cursor-pointer flex flex-col items-center justify-center"
                  onClick={() => navigate(service.link)}
                >
                  <div className={`${service.color} p-3 rounded-full mb-2`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium">{service.name}</span>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Bills;
