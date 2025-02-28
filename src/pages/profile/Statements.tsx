
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, Download, Calendar, Search, ChevronDown, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";

interface Statement {
  id: string;
  period: string;
  size: string;
  url: string;
}

const Statements = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  
  const statements: Statement[] = [
    { id: "1", period: "November 2023", size: "245 KB", url: "#" },
    { id: "2", period: "October 2023", size: "312 KB", url: "#" },
    { id: "3", period: "September 2023", size: "198 KB", url: "#" },
    { id: "4", period: "August 2023", size: "276 KB", url: "#" },
    { id: "5", period: "July 2023", size: "234 KB", url: "#" },
  ];

  const handleGenerateStatement = () => {
    if (!fromDate || !toDate) {
      toast.error("Please select date range");
      return;
    }
    
    if (fromDate > toDate) {
      toast.error("From date cannot be after to date");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Statement generated successfully");
      setIsLoading(false);
    }, 2000);
  };

  const handleDownload = (statement: Statement) => {
    toast.success(`Downloading ${statement.period} statement`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in max-w-3xl mx-auto">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Account Statements</h1>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Generate Statement</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label>Statement Type</Label>
              <Select 
                value={period} 
                onValueChange={setPeriod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                  >
                    {fromDate ? format(fromDate, "PPP") : "Select date"}
                    <Calendar className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                  >
                    {toDate ? format(toDate, "PPP") : "Select date"}
                    <Calendar className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Button 
            className="w-full md:w-auto" 
            onClick={handleGenerateStatement}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Generate Statement
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Previous Statements</h2>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 w-60"
                placeholder="Search statements..."
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {statements.map((statement) => (
              <div 
                key={statement.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{statement.period}</p>
                    <p className="text-sm text-muted-foreground">{statement.size}</p>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDownload(statement)}
                >
                  <Download className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Statements;
