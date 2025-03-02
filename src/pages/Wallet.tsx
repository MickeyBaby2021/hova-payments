import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  WalletIcon, 
  CreditCard, 
  Loader2, 
  PlusCircle, 
  X, 
  ChevronLeft,
  AlertCircle,
  Clock
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import { initiateFlutterwavePayment, initiateMonnifyPayment } from "@/services/payment";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();
  const { user, addToBalance, transactions } = useUser();
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("flutterwave");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNumpad, setShowNumpad] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Clear error message when closing dialog
  useEffect(() => {
    if (!showDialog) {
      setPaymentError(null);
    }
  }, [showDialog]);

  const handlePayment = async () => {
    const amountValue = parseFloat(amount);
    
    if (!amountValue || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsLoading(true);
    setPaymentError(null);
    
    try {
      let result: number | null = null;
      
      if (paymentMethod === "flutterwave") {
        toast.info("Initializing Flutterwave payment...");
        result = await initiateFlutterwavePayment({
          email: user?.email || "user@example.com",
          amount: amountValue,
          name: user?.name || "User",
          phone: user?.phone || "07044040403",
        });
      } else if (paymentMethod === "monnify") {
        toast.info("Initializing Monnify payment...");
        result = await initiateMonnifyPayment({
          email: user?.email || "user@example.com",
          amount: amountValue,
          name: user?.name || "User",
          phone: user?.phone || "07044040403",
        });
      }
      
      if (result) {
        addToBalance(result);
        setAmount("");
        setShowNumpad(false);
        setShowDialog(false);
        
        // Navigate to dashboard after successful payment
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("An error occurred during payment. Please try again or choose a different payment method.");
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

  const handleQuickFund = (amt: number) => {
    setAmount(amt.toString());
    setPaymentMethod("flutterwave");
    setShowNumpad(true);
    setShowDialog(true);
  };

  // Get only successful transactions for the wallet
  const recentFunding = transactions
    .filter(tx => tx.type === "credit" && tx.status === "success")
    .slice(0, 3);
  
  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Wallet</h1>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-hover rounded-full">Fund Wallet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Fund Wallet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {paymentError && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">{paymentError}</p>
                  </div>
                )}
                
                {showNumpad ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute left-0 top-3 rounded-full"
                        onClick={() => setShowNumpad(false)}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Enter Amount</p>
                        <div className="text-3xl font-bold my-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                          ₦{amount || "0"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'delete'].map((num) => (
                        <button
                          key={num}
                          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-foreground py-3 rounded-xl text-xl font-medium transition-colors"
                          onClick={() => {
                            if (num === 'delete') {
                              setAmount(prev => prev.slice(0, -1));
                            } else if (num === '.') {
                              if (!amount.includes('.')) {
                                setAmount(prev => prev + num);
                              }
                            } else {
                              setAmount(prev => prev + num);
                            }
                          }}
                        >
                          {num === 'delete' ? (
                            <X className="h-6 w-6 mx-auto" />
                          ) : (
                            num
                          )}
                        </button>
                      ))}
                    </div>
                    
                    <div className="text-sm text-muted-foreground text-center mb-2">
                      Payment method: <span className="font-medium capitalize">{paymentMethod}</span>
                    </div>
                    
                    <Button 
                      className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" 
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
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl text-center text-white">
                      <p className="text-sm text-white/80">Available Balance</p>
                      <p className="text-3xl font-bold">₦{user?.balance.toLocaleString()}</p>
                    </div>
                    
                    <RadioGroup
                      defaultValue={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div className="border rounded-xl p-4 flex items-center space-x-3 hover:border-primary transition-colors">
                        <RadioGroupItem value="flutterwave" id="flutterwave" />
                        <Label htmlFor="flutterwave" className="flex items-center space-x-3 cursor-pointer flex-1">
                          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium">Flutterwave</p>
                            <p className="text-xs text-muted-foreground">Pay with card, bank transfer or USSD</p>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="border rounded-xl p-4 flex items-center space-x-3 hover:border-primary transition-colors">
                        <RadioGroupItem value="monnify" id="monnify" />
                        <Label htmlFor="monnify" className="flex items-center space-x-3 cursor-pointer flex-1">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
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
                      <Button size="lg" className="w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" onClick={() => setShowNumpad(true)}>
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
        <Card className="ios-primary-card p-6">
          <div className="flex items-center space-x-4 mb-4">
            <WalletIcon className="h-8 w-8" />
            <div>
              <p className="text-sm text-gray-100">Wallet Balance</p>
              <p className="text-3xl font-bold">₦{user?.balance.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Quick Fund Options */}
        <div className="grid gap-4">
          <Card className="p-5 hover-effect ios-card">
            <h2 className="text-xl font-semibold mb-1 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Quick Fund</h2>
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
                    setShowDialog(true);
                  }}
                  className="border-dashed rounded-xl hover:border-primary hover:text-primary transition-colors"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  ₦{amt.toLocaleString()}
                </Button>
              ))}
            </div>
          </Card>
          
          {/* Recent Transactions */}
          <Card className="p-5 ios-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Recent Funding</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/transactions")}
                className="text-primary hover:text-hover rounded-lg"
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentFunding.length > 0 ? (
                recentFunding.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                        <WalletIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      +₦{transaction.amount.toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                  <Clock className="h-10 w-10 mb-2 opacity-50" />
                  <p>No recent funding history</p>
                  <p className="text-sm">Fund your wallet to see transactions here</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
