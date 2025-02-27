
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  WalletIcon, 
  CreditCard, 
  Loader2, 
  PlusCircle, 
  X, 
  ChevronLeft
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { initiateFlutterwavePayment, initiateMonnifyPayment } from "@/services/payment";
import { toast } from "sonner";

const Wallet = () => {
  const { user, addToBalance } = useUser();
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("flutterwave");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNumpad, setShowNumpad] = useState<boolean>(false);

  const handlePayment = async () => {
    const amountValue = parseFloat(amount);
    
    if (!amountValue || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsLoading(true);
    
    try {
      let result: number | null = null;
      
      if (paymentMethod === "flutterwave") {
        result = await initiateFlutterwavePayment({
          email: user?.email || "user@example.com",
          amount: amountValue,
          name: user?.name || "User",
        });
      } else if (paymentMethod === "monnify") {
        result = await initiateMonnifyPayment({
          email: user?.email || "user@example.com",
          amount: amountValue,
          name: user?.name || "User",
        });
      }
      
      if (result) {
        addToBalance(result);
        setAmount("");
        setShowNumpad(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred during payment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumpadClick = (value: string) => {
    if (value === 'clear') {
      setAmount("");
    } else if (value === 'delete') {
      setAmount(prev => prev.slice(0, -1));
    } else if (value === '.') {
      if (!amount.includes('.')) {
        setAmount(prev => prev + value);
      }
    } else {
      setAmount(prev => prev + value);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Wallet</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Fund Wallet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Fund Wallet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {showNumpad ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute left-0 top-3"
                        onClick={() => setShowNumpad(false)}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Enter Amount</p>
                        <div className="text-3xl font-bold my-2">
                          ₦{amount || "0"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'delete'].map((num) => (
                        <button
                          key={num}
                          className="numpad-btn"
                          onClick={() => handleNumpadClick(num.toString())}
                        >
                          {num === 'delete' ? (
                            <X className="h-6 w-6" />
                          ) : (
                            num
                          )}
                        </button>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full h-14 text-lg" 
                      onClick={handlePayment}
                      disabled={isLoading || !amount || parseFloat(amount) <= 0}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      ) : null}
                      Fund Wallet
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                      <p className="text-3xl font-bold">₦{user?.balance.toLocaleString()}</p>
                    </div>
                    
                    <RadioGroup
                      defaultValue={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div className="payment-method-card">
                        <RadioGroupItem value="flutterwave" id="flutterwave" />
                        <Label htmlFor="flutterwave" className="flex items-center space-x-3 cursor-pointer">
                          <div className="bg-orange-100 p-2 rounded-full">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium">Flutterwave</p>
                            <p className="text-xs text-muted-foreground">Pay with card, bank transfer or USSD</p>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="payment-method-card">
                        <RadioGroupItem value="monnify" id="monnify" />
                        <Label htmlFor="monnify" className="flex items-center space-x-3 cursor-pointer">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <WalletIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Monnify</p>
                            <p className="text-xs text-muted-foreground">Quick bank transfers and card payments</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    <div className="flex justify-center">
                      <Button size="lg" className="w-full" onClick={() => setShowNumpad(true)}>
                        Continue
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Balance Card */}
        <Card className="pink-card p-6">
          <div className="flex items-center space-x-4 mb-4">
            <WalletIcon className="h-8 w-8" />
            <div>
              <p className="text-sm text-gray-600">Wallet Balance</p>
              <p className="text-3xl font-bold">₦{user?.balance.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Quick Fund Options */}
        <div className="grid gap-4">
          <Card className="p-5 hover-effect">
            <h2 className="text-xl font-semibold mb-1">Quick Fund</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Add money to your wallet quickly
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[1000, 5000, 10000, 20000].map((amt) => (
                <Button 
                  key={amt} 
                  variant="outline" 
                  onClick={() => {
                    setAmount(amt.toString());
                    setPaymentMethod("flutterwave");
                    setShowNumpad(true);
                  }}
                  className="border-dashed"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  ₦{amt.toLocaleString()}
                </Button>
              ))}
            </div>
          </Card>
          
          {/* Recent Transactions */}
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Recent Funding</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = "/transactions"}
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <WalletIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Wallet Funding</p>
                    <p className="text-xs text-gray-500">Today, 2:30 PM</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">+₦5,000</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
