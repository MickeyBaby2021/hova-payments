
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import { useNotifications } from '@/context/NotificationContext';
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

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    unreadCount 
  } = useNotifications();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className={`fixed w-full z-50 px-4 py-3 ${theme === 'dark' ? 'bg-black border-b border-gray-800' : 'bg-white border-b border-gray-100'} shadow-sm`}>
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
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
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
                        className={`p-3 ${!notification.read ? (theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50') : ''}`}
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
                <p className="text-xs text-muted-foreground">Hello!</p>
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
      <div className={`fixed bottom-0 left-0 right-0 ${theme === 'dark' ? 'bg-black border-t border-gray-800' : 'bg-white border-t border-gray-200'} flex justify-around items-center py-2 px-4 z-40`}>
        <Button
          variant="ghost"
          className={`flex flex-col items-center justify-center h-auto py-1 ${isActive('/dashboard') ? 'text-primary' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center justify-center h-auto py-1 ${isActive('/wallet') ? 'text-primary' : ''}`}
          onClick={() => navigate('/wallet')}
        >
          <WalletIcon className="h-5 w-5" />
          <span className="text-xs mt-1">Wallet</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center justify-center h-auto py-1 ${isActive('/bills') ? 'text-primary' : ''}`}
          onClick={() => navigate('/bills')}
        >
          <Receipt className="h-5 w-5" />
          <span className="text-xs mt-1">Services</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center justify-center h-auto py-1 ${isActive('/transactions') ? 'text-primary' : ''}`}
          onClick={() => navigate('/transactions')}
        >
          <History className="h-5 w-5" />
          <span className="text-xs mt-1">History</span>
        </Button>
      </div>

      {/* Chat Button */}
      <ChatButton />
    </div>
  );
};

export default DashboardLayout;
