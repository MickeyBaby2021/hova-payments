
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'transaction' | 'system' | 'alert';
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
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

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      time: 'Just now',
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for the new notification
    toast(notification.title, {
      description: notification.message,
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('hovapay-notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Load notifications from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('hovapay-notifications');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error('Error parsing notifications:', error);
      }
    }
  }, []);

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        addNotification, 
        markAsRead, 
        markAllAsRead, 
        clearNotifications,
        unreadCount 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
