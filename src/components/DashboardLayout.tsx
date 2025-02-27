
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import {
  WalletIcon,
  History,
  LogOut,
  User,
  Home,
  Receipt,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const userName = "John Doe"; // This will be replaced with actual user data

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b bg-card/80 backdrop-blur-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">HovaPay</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <Avatar>
                <User className="h-5 w-5" />
              </Avatar>
            </Button>
            <span className="font-medium">{userName}</span>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 pt-20 bg-card/80 backdrop-blur-sm border-r flex flex-col items-center space-y-6">
        <Button
          variant="ghost"
          size="icon"
          className="hover-effect"
          onClick={() => navigate('/dashboard')}
        >
          <Home className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover-effect"
          onClick={() => navigate('/wallet')}
        >
          <WalletIcon className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover-effect"
          onClick={() => navigate('/transactions')}
        >
          <History className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover-effect"
          onClick={() => navigate('/bills')}
        >
          <Receipt className="h-5 w-5" />
        </Button>
        <div className="flex-grow" />
        <Button
          variant="ghost"
          size="icon"
          className="hover-effect text-destructive"
          onClick={() => {
            // Handle logout
            navigate('/login');
          }}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Content */}
      <main className="pl-16 pt-16">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
