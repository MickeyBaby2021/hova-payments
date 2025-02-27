
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-purple-900 flex flex-col items-center justify-center p-4">
      <div className="mb-10 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to HovaPay</h1>
        <p>The Magic of Smart Banking</p>
      </div>
      
      <Card className="w-full max-w-md p-6 glass-card fade-in">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-muted-foreground">Access your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="p-0 text-primary"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
