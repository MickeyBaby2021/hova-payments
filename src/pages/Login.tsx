
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);

    // Simulate login - this would be replaced with API call
    setTimeout(() => {
      // Simulate successful login
      if (email.includes("@")) {
        const mockUser = {
          name: "Rupak Chakraborty",
          email,
          balance: 25000,
          avatar: "https://i.pravatar.cc/150?img=8",
          phone: "07044040403"
        };
        setUser(mockUser);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-800 opacity-100" />
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">HOVAPAY</h1>
          <p className="text-blue-100">Your financial freedom starts here</p>
        </div>
        
        <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 rounded-2xl shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-blue-100 text-sm">Sign in to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-white/70" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-white/70" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 text-white/70 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200">
                  Forgot Password?
                </Link>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-white/70">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-300 hover:text-blue-200 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
