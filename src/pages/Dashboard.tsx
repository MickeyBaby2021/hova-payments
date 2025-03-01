
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Tv,
  Lightbulb,
  Phone,
  Gift,
  Ticket,
  Plane,
  Building2,
  ShieldCheck,
  GraduationCap,
  Send,
  PlusCircle,
  CreditCard,
  ArrowDown,
  ArrowUp,
  Receipt,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const { user, transactions } = useUser();
  const navigate = useNavigate();
  
  // Get real transactions
  const recentActivities = transactions.slice(0, 3);

  const quickServices = [
    { icon: Send, name: "Transfer", color: "bg-primary", route: "/transfer" },
    { icon: CreditCard, name: "E-wallet", color: "bg-primary", route: "/ewallet" },
    { icon: Receipt, name: "Bill", color: "bg-primary", route: "/bills" },
    { icon: PlusCircle, name: "More", color: "bg-primary", route: "/more" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        {/* Main Wallet Card */}
        <Card className="light-purple-card p-6 glass-card">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <p className="text-sm font-medium">Main Wallet</p>
            </div>
            <span className="text-sm">→</span>
          </div>
          <div className="my-3">
            <h1 className="text-4xl font-bold">₦{user?.balance.toLocaleString()}</h1>
          </div>
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              className="bg-white/20 hover:bg-white/30 border-white/40 text-white"
              onClick={() => navigate('/wallet')}
            >
              Fund Wallet
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {quickServices.map((service) => (
            <div 
              key={service.name} 
              className="text-center cursor-pointer"
              onClick={() => navigate(service.route)}
            >
              <div className={`${service.color} h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-2 glass-card`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs font-medium">{service.name}</p>
            </div>
          ))}
        </div>

        {/* Activities */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Activities</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/transactions')}>
              See All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item glass-card">
                  <div className="flex items-center">
                    <div className={`${activity.type === 'credit' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-amber-100 dark:bg-amber-900/20'} p-3 rounded-full mr-3`}>
                      {activity.type === 'credit' ? (
                        <ArrowDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <ArrowUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.description}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-semibold ${activity.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    {activity.type === "credit" ? "+" : "-"}₦{activity.amount.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-muted/20 rounded-lg glass-card">
                <Clock className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">No recent activities</p>
                <p className="text-sm text-muted-foreground">Your transactions will appear here</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/wallet')}
                >
                  Fund Wallet
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
