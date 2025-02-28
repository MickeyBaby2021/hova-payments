
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Settings, Bell, Moon, Languages, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";
import { useNotifications } from "@/context/NotificationContext";

const Preferences = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { addNotification } = useNotifications();
  
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [language, setLanguage] = useState("english");
  const [currency, setCurrency] = useState("ngn");

  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully");
    
    addNotification({
      title: "Preferences Updated",
      message: "Your app preferences have been updated successfully",
      type: "system"
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Preferences</h1>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
              </div>
              <Switch 
                checked={pushNotifications} 
                onCheckedChange={setPushNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important updates
                  </p>
                </div>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Transaction Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about all transactions
                  </p>
                </div>
              </div>
              <Switch 
                checked={transactionAlerts} 
                onCheckedChange={setTransactionAlerts} 
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Display Settings</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                  <Moon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                  <Languages className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="yoruba">Yoruba</SelectItem>
                    <SelectItem value="hausa">Hausa</SelectItem>
                    <SelectItem value="igbo">Igbo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Primary Currency</Label>
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngn">Nigerian Naira (₦)</SelectItem>
                    <SelectItem value="usd">US Dollar ($)</SelectItem>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="gbp">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-6"
            onClick={handleSavePreferences}
          >
            Save Preferences
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Preferences;
