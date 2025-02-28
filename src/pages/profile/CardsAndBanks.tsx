
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CreditCard, 
  Building, 
  Plus, 
  ArrowLeft,
  Trash2,
  Edit
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CardsAndBanks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("cards");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"card" | "bank">("card");

  // Mock data
  const cards = [
    {
      id: 1,
      last4: "4532",
      expiry: "09/26",
      type: "VISA",
      isDefault: true,
    }
  ];

  const banks = [
    {
      id: 1,
      name: "First Bank",
      accountNumber: "1234567890",
      isDefault: true,
    }
  ];

  const handleAddNew = (type: "card" | "bank") => {
    setDialogType(type);
    setShowAddDialog(true);
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
          <h1 className="text-2xl font-bold">Cards & Banks</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="cards">Payment Cards</TabsTrigger>
            <TabsTrigger value="banks">Bank Accounts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cards">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Cards</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddNew("card")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </div>
              
              {cards.length === 0 ? (
                <div className="text-center py-8">
                  <div className="bg-muted rounded-full p-4 inline-flex mb-4">
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Cards Yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add a debit or credit card to make quick payments
                  </p>
                  <Button 
                    onClick={() => handleAddNew("card")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Card
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cards.map((card) => (
                    <div 
                      key={card.id}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-primary" />
                          <span className="font-medium">{card.type}</span>
                        </div>
                        {card.isDefault && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-lg font-medium mb-1">•••• •••• •••• {card.last4}</p>
                      <p className="text-sm text-muted-foreground">Expires: {card.expiry}</p>
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="banks">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Bank Accounts</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddNew("bank")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bank
                </Button>
              </div>
              
              {banks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="bg-muted rounded-full p-4 inline-flex mb-4">
                    <Building className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Bank Accounts</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add a bank account to receive withdrawals easily
                  </p>
                  <Button 
                    onClick={() => handleAddNew("bank")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bank Account
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {banks.map((bank) => (
                    <div 
                      key={bank.id}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <Building className="h-5 w-5 mr-2 text-primary" />
                          <span className="font-medium">{bank.name}</span>
                        </div>
                        {bank.isDefault && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-lg font-medium mb-1">{bank.accountNumber}</p>
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add New Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {dialogType === "card" ? "Add New Card" : "Add Bank Account"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {dialogType === "card" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" placeholder="Select Bank" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" placeholder="0123456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input id="accountName" placeholder="John Doe" />
                  </div>
                </>
              )}
              
              <Button className="w-full">
                Save {dialogType === "card" ? "Card" : "Bank Account"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CardsAndBanks;
