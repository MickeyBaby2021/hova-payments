
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Send,
  PlusCircle,
  CreditCard,
  ArrowDown,
  ArrowUp,
  Receipt,
  Clock,
  Wallet,
  Smartphone
} from "lucide-react";

const Dashboard = () => {
  const { user, transactions } = useUser();
  const navigate = useNavigate();
  
  // Get real transactions
  const recentActivities = transactions.slice(0, 3);

  const quickServices = [
    { icon: Send, name: "Transfer", color: "bg-gradient-to-br from-blue-700 to-blue-900", route: "/transfer" },
    { icon: CreditCard, name: "E-wallet", color: "bg-gradient-to-br from-indigo-700 to-indigo-900", route: "/ewallet" },
    { icon: Receipt, name: "Bills", color: "bg-gradient-to-br from-blue-800 to-indigo-800", route: "/bills" },
    { icon: PlusCircle, name: "More", color: "bg-gradient-to-br from-indigo-600 to-blue-800", route: "/more" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        {/* Title with elegant styling */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 bg-clip-text text-transparent mb-1 tracking-tight">
            HOVAPAY
          </h1>
          <p className="text-sm text-muted-foreground">Your Financial Partner</p>
        </div>
        
        {/* Main Wallet Card */}
        <Card className="bg-gradient-to-r from-blue-800 to-indigo-900 p-6 text-white rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <p className="text-sm font-medium">Main Wallet</p>
            </div>
            <span className="text-sm opacity-60">Available Balance</span>
          </div>
          <div className="my-4">
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
            <Button 
              variant="outline" 
              className="bg-white/20 hover:bg-white/30 border-white/40 text-white"
              onClick={() => navigate('/bills')}
            >
              Pay Bills
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mt-8">
          {quickServices.map((service) => (
            <div 
              key={service.name} 
              className="text-center cursor-pointer group"
              onClick={() => navigate(service.route)}
            >
              <div className={`${service.color} h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-2 glass-card transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs font-medium bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-700 transition-all">{service.name}</p>
            </div>
          ))}
        </div>

        {/* Activities */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">Recent Activities</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/transactions')} className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              See All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item glass-card hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300">
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
              <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg glass-card border border-blue-100 dark:border-blue-800/30 shadow-md">
                <Clock className="h-10 w-10 mx-auto mb-3 text-blue-500 opacity-70" />
                <p className="text-blue-800 dark:text-blue-300 font-medium">No recent activities</p>
                <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Your transactions will appear here</p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20"
                  onClick={() => navigate('/wallet')}
                >
                  Fund Wallet
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Popular Services Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">Popular Services</h2>
          <Card className="p-4 hover:shadow-md transition-all duration-300">
            <div className="grid grid-cols-4 gap-4">
              <ServiceCard icon={Smartphone} name="Airtime" color="bg-gradient-to-br from-blue-600 to-blue-800" onClick={() => navigate('/bills/airtime')} />
              <ServiceCard icon={Receipt} name="Data" color="bg-gradient-to-br from-indigo-600 to-indigo-800" onClick={() => navigate('/bills/data')} />
              <ServiceCard icon={CreditCard} name="Cable TV" color="bg-gradient-to-br from-blue-700 to-blue-900" onClick={() => navigate('/bills/cable')} />
              <ServiceCard icon={Send} name="Transfer" color="bg-gradient-to-br from-indigo-700 to-indigo-900" onClick={() => navigate('/transfer')} />
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Service Card Component
const ServiceCard = ({ icon: Icon, name, color, onClick }: { 
  icon: React.ElementType, 
  name: string, 
  color: string,
  onClick: () => void 
}) => {
  return (
    <div 
      className="cursor-pointer group transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className={`${color} rounded-xl p-3 flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p className="text-xs font-medium text-center">{name}</p>
    </div>
  );
};

export default Dashboard;
