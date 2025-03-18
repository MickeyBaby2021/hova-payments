
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, CreditCard, Smartphone } from "lucide-react";

const StartupScreens = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();
  
  const screens = [
    {
      title: "Welcome to HOVAPAY",
      description: "Your ultimate financial companion for all your payment needs",
      icon: <CreditCard className="h-16 w-16 text-blue-300" />,
    },
    {
      title: "Secure Transactions",
      description: "We use industry-leading security measures to protect your financial data",
      icon: <ShieldCheck className="h-16 w-16 text-blue-300" />,
    },
    {
      title: "Pay On The Go",
      description: "Make payments, buy airtime, and pay bills anytime, anywhere",
      icon: <Smartphone className="h-16 w-16 text-blue-300" />,
    },
  ];
  
  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(prev => prev + 1);
    } else {
      navigate("/login");
    }
  };
  
  const handleSkip = () => {
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-800 opacity-100" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">HOVAPAY</h1>
            <p className="text-blue-200 text-lg">Your Financial Partner</p>
          </div>
          
          <div className="py-8 flex flex-col items-center">
            <div className="bg-white/10 rounded-full p-10 backdrop-blur-md shadow-xl mb-8">
              {screens[currentScreen].icon}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 text-center">
              {screens[currentScreen].title}
            </h2>
            <p className="text-blue-100 text-center mb-8 max-w-xs">
              {screens[currentScreen].description}
            </p>
            
            <div className="flex justify-center space-x-2 mb-8">
              {screens.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentScreen ? "w-8 bg-blue-400" : "w-2 bg-blue-400/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex justify-between items-center z-10">
        <Button 
          variant="ghost"
          className="text-blue-200 hover:text-white"
          onClick={handleSkip}
        >
          Skip
        </Button>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0"
          onClick={handleNext}
        >
          {currentScreen < screens.length - 1 ? "Next" : "Get Started"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default StartupScreens;
