
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WalletIcon, Zap, CreditCard, ShieldCheck, ArrowRight } from "lucide-react";

const StartupScreens = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-advance screens after delay
    const timer = setTimeout(() => {
      if (currentScreen < screens.length - 1) {
        setCurrentScreen(prev => prev + 1);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentScreen]);

  const screens = [
    {
      title: "Welcome to HovaPay",
      description: "Your one-stop solution for all bill payments and financial services.",
      icon: <ShieldCheck className="h-16 w-16 text-primary" />,
      color: "bg-primary/10",
      animation: "animate-fadeIn"
    },
    {
      title: "Pay bills effortlessly",
      description: "Fast and secure payments for airtime, data, electricity, TV subscriptions and more.",
      icon: <Zap className="h-16 w-16 text-primary" />,
      color: "bg-primary/10",
      animation: "animate-slideInRight"
    },
    {
      title: "Secure wallet system",
      description: "Fund your wallet once and make multiple payments without stress.",
      icon: <WalletIcon className="h-16 w-16 text-indigo-600" />,
      color: "bg-indigo-100 dark:bg-indigo-950/30",
      animation: "animate-slideInUp"
    },
    {
      title: "Multiple payment options",
      description: "Pay with cards, bank transfers, or mobile money. It's your choice.",
      icon: <CreditCard className="h-16 w-16 text-green-600" />,
      color: "bg-green-100 dark:bg-green-950/30",
      animation: "animate-pulse"
    }
  ];

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleSkip = () => {
    navigate("/login");
  };

  const goToNextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(prev => prev + 1);
    } else {
      handleGetStarted();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          className="text-sm"
          onClick={handleSkip}
        >
          Skip
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        <Card className={`p-8 w-full max-w-md mx-auto ${screens[currentScreen].color} border-none shadow-lg transition-all duration-500 ${screens[currentScreen].animation}`}>
          <div className="flex justify-center mb-6 transition-all duration-300 animate-bounce">
            {screens[currentScreen].icon}
          </div>
          <h1 className="text-3xl font-bold text-center mb-4 transition-all duration-300 animate-fadeIn">
            {screens[currentScreen].title}
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-8 transition-all duration-300 animate-fadeIn">
            {screens[currentScreen].description}
          </p>
        </Card>

        <div className="flex justify-center space-x-2 mt-6">
          {screens.map((_, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentScreen === index ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
              onClick={() => setCurrentScreen(index)}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        {currentScreen < screens.length - 1 ? (
          <Button 
            className="w-full flex items-center justify-center" 
            size="lg"
            onClick={goToNextScreen}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
};

export default StartupScreens;
