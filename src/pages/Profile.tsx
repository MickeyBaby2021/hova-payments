
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Mail, Phone, Lock, Camera, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "08012345678",
    avatar: user?.avatar || ""
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        setUser({
          ...user,
          name: formData.name,
          email: formData.email,
          avatar: formData.avatar
        });
      }
      
      setIsEditing(false);
      setIsLoading(false);
      toast.success("Profile updated successfully!");
    }, 1500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      setIsLoading(false);
      toast.success("Password changed successfully!");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-primary mb-2">
              <img src={user?.avatar} alt={user?.name} />
            </Avatar>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute bottom-1 right-0 rounded-full bg-white dark:bg-gray-800"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-semibold mt-2">{user?.name}</h2>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card className="p-6">
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="name">Full Name</Label>
                    {!isEditing && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      className="pl-10"
                      value={formData.name}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Your phone number"
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex space-x-3 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || "",
                          email: user?.email || "",
                          phone: "08012345678",
                          avatar: user?.avatar || ""
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="p-6">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      className="pl-10"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      className="pl-10"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="pl-10"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-4"
                  disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Change Password
                </Button>
              </form>
              
              <div className="mt-6 border-t pt-6">
                <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Add an extra layer of security to your account.
                </p>
                <Button variant="outline" className="w-full">Enable 2FA</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
