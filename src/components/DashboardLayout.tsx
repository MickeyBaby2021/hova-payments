
import React, { useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import {
  WalletIcon,
  History,
  Home,
  Receipt,
  Bell,
  Moon,
  Sun,
  X,
  Check,
} from 'lucide-react';
import ChatButton from './ChatButton';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'transaction' | 'system' | 'alert';
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Wallet Funded',
      message: 'Your wallet has been funded with ₦5,000',
      time: '2 mins ago',
      read: false,
      type: 'transaction'
    },
    {
      id: 2,
      title: 'Airtime Purchase',
      message: 'Airtime purchase of ₦1,000 was successful',
      time: '1 hour ago',
      read: false,
      type: 'transaction'
    },
    {
      id: 3,
      title: 'Welcome to HovaPay',
      message: 'Thank you for joining HovaPay',
      time: '1 day ago',
      read: true,
      type: 'system'
    }
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card shadow-sm fixed w-full z-50 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary">HovaPay</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 max-h-96 overflow-y-auto" align="end">
                <div className="flex items-center justify-between p-3 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </div>
                
                <div className="divide-y divide-border">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${!notification.read ? 'notification-item-unread' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <p className="font-medium text-sm">{notification.title}</p>
                              {!notification.read && (
                                <span className="ml-2 w-2 h-2 rounded-full bg-blue-500"></span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                          
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate('/profile')}
            >
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
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around items-center py-2 px-4 z-40">
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

      {/* Chat Button */}
      <ChatButton />
    </div>
  );
};

export default DashboardLayout;
