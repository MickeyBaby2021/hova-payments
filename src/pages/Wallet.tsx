
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
  Clock,
  Check,
  Eye,
  EyeOff,
  Smile
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import { 
  initiatePaystackPayment, 
  initiateMonnifyPayment, 
  initiateSmilePayment 
} from "@/services/payment";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();
  const { user, addToBalance, transactions, resetBalance, showBalance, toggleBalanceVisibility } = useUser();
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("paystack");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNumpad, setShowNumpad] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showPaymentSelection, setShowPaymentSelection] = useState<boolean>(true);

  // Clear error message when closing dialog
  useEffect(() => {
    if (!showDialog) {
      setPaymentError(null);
      setShowPaymentSelection(true);
      setShowNumpad(false);
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
      
      if (paymentMethod === "paystack") {
        toast.info("Initializing Paystack payment...");
        result = await initiatePaystackPayment({
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
      } else if (paymentMethod === "smile") {
        toast.info("Initializing Smile payment...");
        result = await initiateSmilePayment({
          email: user?.email || "user@example.com",
          amount: amountValue,
          name: user?.name || "User",
          phone: user?.phone || "07044040403",
        });
      }
      
      if (result) {
        // Add to balance (not reset)
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
    setShowPaymentSelection(true);
    setShowNumpad(false);
    setShowDialog(true);
  };

  // Get only successful transactions for the wallet
  const recentFunding = transactions
    .filter(tx => tx.type === "credit" && tx.status === "success")
    .slice(0, 3);
  
  const handleContinueToNumpad = () => {
    setShowPaymentSelection(false);
    setShowNumpad(true);
  };

  const handleBackToPaymentSelection = () => {
    setShowPaymentSelection(true);
    setShowNumpad(false);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">Wallet</h1>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-hover rounded-full">Fund Wallet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-xl bg-white dark:bg-gray-900">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-center bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">Fund Wallet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {paymentError && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">{paymentError}</p>
                  </div>
                )}
                
                {showPaymentSelection && !showNumpad && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 rounded-xl text-center text-white relative">
                      <p className="text-sm text-white/80">Available Balance</p>
                      <div className="flex justify-center items-center gap-2">
                        <p className="text-3xl font-bold">
                          {showBalance 
                            ? `₦${user?.balance.toLocaleString()}`
                            : "₦•••••••"
                          }
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10 absolute right-2 top-2"
                          onClick={toggleBalanceVisibility}
                        >
                          {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <p className="text-sm text-muted-foreground">Enter Amount</p>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*\.?\d*$/.test(value)) {
                            setAmount(value);
                          }
                        }}
                        className="text-3xl font-bold my-2 bg-transparent text-center w-full bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    
                    <p className="text-sm font-medium text-center mb-1">Quick Amounts</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[1000, 5000, 10000, 20000].map((amt) => (
                        <Button 
                          key={amt} 
                          variant="outline" 
                          onClick={() => setAmount(amt.toString())}
                          className="border-dashed rounded-xl hover:border-primary hover:text-primary transition-colors"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          ₦{amt.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                    
                    <p className="text-sm font-medium text-center mb-1">Choose Payment Method</p>
                    <RadioGroup
                      defaultValue={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div className="border rounded-xl p-4 flex items-center space-x-3 hover:border-primary transition-colors">
                        <RadioGroupItem value="paystack" id="paystack" />
                        <Label htmlFor="paystack" className="flex items-center space-x-3 cursor-pointer flex-1">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                            <CreditCard className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Paystack</p>
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

                      <div className="border rounded-xl p-4 flex items-center space-x-3 hover:border-primary transition-colors">
                        <RadioGroupItem value="smile" id="smile" />
                        <Label htmlFor="smile" className="flex items-center space-x-3 cursor-pointer flex-1">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                            <Smile className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">Smile</p>
                            <p className="text-xs text-muted-foreground">VTPass Smile payment integration</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    <div className="flex justify-center">
                      <Button 
                        size="lg" 
                        className="w-full rounded-full bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900" 
                        onClick={handleContinueToNumpad}
                        disabled={!amount || parseFloat(amount) <= 0}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}
                
                {showNumpad && (
                  <div className="space-y-6">
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute left-0 top-3 rounded-full"
                        onClick={handleBackToPaymentSelection}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Amount to Fund</p>
                        <div className="text-3xl font-bold my-2 bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                          ₦{amount || "0"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-center text-muted-foreground">
                      <p className="font-medium">Payment Summary</p>
                      <div className="flex justify-between items-center border-b py-2 mx-8">
                        <span>Amount:</span>
                        <span className="font-medium">₦{parseFloat(amount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center border-b py-2 mx-8">
                        <span>Payment Method:</span>
                        <span className="font-medium capitalize">{paymentMethod}</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Your wallet will be funded after successful payment. You'll be redirected back to the app automatically.
                      </p>
                    </div>
                    
                    <Button 
                      className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900" 
                      onClick={handlePayment}
                      disabled={isLoading || !amount || parseFloat(amount) <= 0}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      ) : null}
                      Pay ₦{parseFloat(amount || "0").toLocaleString()}
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white rounded-2xl shadow-xl relative">
          <div className="flex items-center space-x-4 mb-4">
            <WalletIcon className="h-8 w-8" />
            <div>
              <p className="text-sm text-gray-100">Wallet Balance</p>
              <p className="text-3xl font-bold">
                {showBalance 
                  ? `₦${user?.balance.toLocaleString()}`
                  : "₦•••••••"
                }
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10 absolute right-3 top-3"
            onClick={toggleBalanceVisibility}
          >
            {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </Card>

        {/* Quick Fund Options */}
        <div className="grid gap-4">
          <Card className="p-5 hover-effect ios-card">
            <h2 className="text-xl font-semibold mb-1 bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">Quick Fund</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Add money to your wallet quickly
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[1000, 5000, 10000, 20000].map((amt) => (
                <Button 
                  key={amt} 
                  variant="outline" 
                  onClick={() => handleQuickFund(amt)}
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
              <h2 className="text-lg font-medium bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">Recent Funding</h2>
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
