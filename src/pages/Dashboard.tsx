
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
} from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Mock transactions
  const activities = [
    {
      id: 1,
      type: "debit",
      amount: 31350,
      title: "Netflix Premium",
      date: "22 Jun 2024 - 12:00 PM",
      icon: Tv,
      iconBg: "bg-amber-100"
    },
    {
      id: 2,
      type: "credit",
      amount: 58500,
      title: "Received Money",
      date: "20 Jun 2024 - 1:20 PM",
      icon: ArrowDown,
      iconBg: "bg-blue-100"
    },
    {
      id: 3,
      type: "debit",
      amount: 5850,
      title: "Spotify Premium",
      date: "19 Jun 2024 - 4:00 PM",
      icon: CreditCard,
      iconBg: "bg-amber-100"
    },
  ];

  const quickServices = [
    { icon: Send, name: "Transfer", color: "bg-primary" },
    { icon: CreditCard, name: "E-wallet", color: "bg-primary" },
    { icon: Receipt, name: "Bill", color: "bg-primary" },
    { icon: PlusCircle, name: "More", color: "bg-primary" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        {/* Main Wallet Card */}
        <Card className="light-purple-card p-6">
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
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="font-medium">8.82%</span>
              <span className="text-green-500 ml-1">(+₦970)</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {quickServices.map((service) => (
            <div key={service.name} className="text-center">
              <div className={`${service.color} h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-2`}>
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
            {activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="flex items-center">
                  <div className={`${activity.iconBg} p-3 rounded-full mr-3`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <div className={`text-sm font-semibold ${activity.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                  {activity.type === "credit" ? "+" : "-"}₦{activity.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
