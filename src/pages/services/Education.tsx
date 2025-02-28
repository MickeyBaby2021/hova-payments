
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, GraduationCap, Loader2, School, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { payBill } from "@/services/payment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const institutions = [
  { id: "waec", name: "WAEC", serviceID: "waec" },
  { id: "jamb", name: "JAMB", serviceID: "jamb" },
  { id: "neco", name: "NECO", serviceID: "neco" },
  { id: "nabteb", name: "NABTEB", serviceID: "nabteb" },
  { id: "jupeb", name: "JUPEB", serviceID: "jupeb" },
  { id: "ijmb", name: "IJMB", serviceID: "ijmb" },
  { id: "trcn", name: "TRCN", serviceID: "trcn" },
  { id: "lautech", name: "LAUTECH", serviceID: "lautech" },
  { id: "unizik", name: "UNIZIK", serviceID: "unizik" },
  { id: "unilag", name: "UNILAG", serviceID: "unilag" },
  { id: "ui", name: "University of Ibadan", serviceID: "ui" },
  { id: "oau", name: "Obafemi Awolowo University", serviceID: "oau" },
];

const Education = () => {
  const navigate = useNavigate();
  const { user, deductFromBalance } = useUser();
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("tuition");
  const [isLoading, setIsLoading] = useState(false);
  
  const paymentTypes = [
    { id: "tuition", name: "Tuition Fee" },
    { id: "acceptance", name: "Acceptance Fee" },
    { id: "hostel", name: "Hostel Fee" },
    { id: "exams", name: "Examination Fee" },
    { id: "registration", name: "Registration Fee" },
  ];

  const handlePayFees = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = parseFloat(amount);
    
    if (!amountValue || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!selectedInstitution) {
      toast.error("Please select an institution");
      return;
    }
    
    if (!studentId) {
      toast.error("Please enter student ID");
      return;
    }
    
    if (!studentName) {
      toast.error("Please enter student name");
      return;
    }
    
    if (!studentEmail) {
      toast.error("Please enter student email");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First deduct from wallet
      const isDeducted = deductFromBalance(amountValue);
      
      if (!isDeducted) {
        setIsLoading(false);
        return;
      }
      
      // Then process VTPass payment
      const institution = institutions.find(i => i.id === selectedInstitution);
      
      if (!institution) {
        toast.error("Invalid institution selected");
        setIsLoading(false);
        return;
      }
      
      const success = await payBill({
        serviceID: institution.serviceID,
        variation_code: paymentType,
        amount: amountValue,
        phone: studentEmail,
        billersCode: studentId,
      });
      
      if (success) {
        toast.success(`${institution.name} payment successful!`);
        toast("Payment receipt has been sent to your email", {
          description: "Check your email for payment confirmation",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Education payment error:", error);
      toast.error("An error occurred while processing your request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/bills")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Education Payments</h1>
        </div>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Available Balance</p>
          </div>
          <p className="text-2xl font-bold">₦{user?.balance.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <form onSubmit={handlePayFees} className="space-y-6">
            <div className="space-y-2">
              <Label>Select Institution</Label>
              <Select 
                value={selectedInstitution} 
                onValueChange={setSelectedInstitution}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an institution" />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map((institution) => (
                    <SelectItem key={institution.id} value={institution.id}>
                      <div className="flex items-center space-x-2">
                        {institution.id.includes('university') ? (
                          <Building className="h-4 w-4" />
                        ) : (
                          <School className="h-4 w-4" />
                        )}
                        <span>{institution.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Payment Type</Label>
              <Select 
                value={paymentType} 
                onValueChange={setPaymentType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID/Matric Number</Label>
              <Input
                id="studentId"
                placeholder="Enter student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                placeholder="Enter student name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentEmail">Student Email</Label>
              <Input
                id="studentEmail"
                type="email"
                placeholder="Enter student email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="₦0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !amount || !selectedInstitution || !studentId || !studentName || !studentEmail}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
              Pay Now
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Education;
