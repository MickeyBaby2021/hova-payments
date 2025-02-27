
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import {
  WalletIcon,
  History,
  Home,
  Receipt,
  Bell,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary">HovaPay</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <img src={user?.avatar} alt={user?.name} />
              </Avatar>
              <div className="hidden md:block">
                <p className="font-medium text-sm">{user?.name}</p>
                <p className="text-xs text-muted-foreground">Good Morning!</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        <div className="container mx-auto p-4">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 px-4 z-40">
        <Button
          variant="ghost"
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        <Button
          variant="ghost"
          className={`nav-item ${isActive('/wallet') ? 'active' : ''}`}
          onClick={() => navigate('/wallet')}
        >
          <WalletIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Wallet</span>
        </Button>
        <Button
          variant="ghost"
          className={`nav-item ${isActive('/bills') ? 'active' : ''}`}
          onClick={() => navigate('/bills')}
        >
          <Receipt className="h-6 w-6" />
          <span className="text-xs mt-1">Services</span>
        </Button>
        <Button
          variant="ghost"
          className={`nav-item ${isActive('/transactions') ? 'active' : ''}`}
          onClick={() => navigate('/transactions')}
        >
          <History className="h-6 w-6" />
          <span className="text-xs mt-1">History</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayout;
