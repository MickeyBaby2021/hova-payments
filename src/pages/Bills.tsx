
import { useState, useEffect } from "react";
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
import { fetchServiceVariations } from "@/services/payment";
import { toast } from "sonner";

const Bills = () => {
  const navigate = useNavigate();
  const [loadingServices, setLoadingServices] = useState(false);
  
  const services = [
    {
      category: "Mobile",
      items: [
        { icon: Phone, name: "Airtime", link: "/bills/airtime", color: "bg-gradient-to-br from-blue-500 to-blue-700", serviceID: "airtime", type: "prepaid" },
        { icon: Wifi, name: "Data", link: "/bills/data", color: "bg-gradient-to-br from-purple-500 to-purple-700", serviceID: "data", type: "prepaid" },
      ]
    },
    {
      category: "Utilities",
      items: [
        { icon: Lightbulb, name: "Electricity", link: "/bills/electricity", color: "bg-gradient-to-br from-yellow-500 to-yellow-700", serviceID: "electricity", type: "prepaid" },
        { icon: Tv, name: "Cable TV", link: "/bills/cable", color: "bg-gradient-to-br from-red-500 to-red-700", serviceID: "tv", type: "prepaid" },
        { icon: Droplet, name: "Water", link: "/bills/water", color: "bg-gradient-to-br from-blue-400 to-blue-600", serviceID: "water", type: "prepaid" },
        { icon: Globe, name: "Internet", link: "/bills/internet", color: "bg-gradient-to-br from-green-500 to-green-700", serviceID: "internet", type: "prepaid" },
      ]
    },
    {
      category: "Entertainment",
      items: [
        { icon: Ticket, name: "Movies", link: "/bills/movies", color: "bg-gradient-to-br from-indigo-500 to-indigo-700", serviceID: "movies", type: "prepaid" },
        { icon: Gift, name: "Gift Cards", link: "/bills/gift-cards", color: "bg-gradient-to-br from-pink-500 to-pink-700", serviceID: "giftcards", type: "prepaid" },
        { icon: Gamepad2, name: "Gaming", link: "/bills/gaming", color: "bg-gradient-to-br from-purple-600 to-purple-800", serviceID: "gaming", type: "prepaid" },
      ]
    },
    {
      category: "Travel & Accommodation",
      items: [
        { icon: Plane, name: "Flights", link: "/bills/flights", color: "bg-gradient-to-br from-blue-600 to-blue-800", serviceID: "flights", type: "prepaid" },
        { icon: Building2, name: "Hotels", link: "/bills/hotels", color: "bg-gradient-to-br from-green-600 to-green-800", serviceID: "hotels", type: "prepaid" },
      ]
    },
    {
      category: "Financial Services",
      items: [
        { icon: ShieldCheck, name: "Insurance", link: "/bills/insurance", color: "bg-gradient-to-br from-teal-500 to-teal-700", serviceID: "insurance", type: "prepaid" },
        { icon: CreditCard, name: "Betting", link: "/bills/betting", color: "bg-gradient-to-br from-orange-500 to-orange-700", serviceID: "betting", type: "prepaid" },
      ]
    },
    {
      category: "Education",
      items: [
        { icon: GraduationCap, name: "School Fees", link: "/bills/education", color: "bg-gradient-to-br from-amber-500 to-amber-700", serviceID: "education", type: "prepaid" },
      ]
    },
  ];

  // Preload common service variations
  useEffect(() => {
    const preloadServices = async () => {
      try {
        setLoadingServices(true);
        // Preload data for common services
        await Promise.all([
          fetchServiceVariations("mtn-data"),
          fetchServiceVariations("airtel-data"),
          fetchServiceVariations("glo-data"),
          fetchServiceVariations("9mobile-data")
        ]);
        console.log("Services preloaded successfully");
      } catch (error) {
        console.error("Error preloading services:", error);
      } finally {
        setLoadingServices(false);
      }
    };

    preloadServices();
  }, []);

  const handleServiceClick = (service: any) => {
    // Store the selected service ID in localStorage for use in service pages
    localStorage.setItem('selectedServiceID', service.serviceID);
    localStorage.setItem('selectedServiceType', service.type || 'prepaid');
    navigate(service.link);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 fade-in max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">VTPass Services</h1>
        
        {services.map((category) => (
          <div key={category.category} className="space-y-4">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">{category.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {category.items.map((service) => (
                <Card
                  key={service.name}
                  className="p-4 hover-effect cursor-pointer flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 hover:scale-105"
                  onClick={() => handleServiceClick(service)}
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
