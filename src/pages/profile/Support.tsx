
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, HelpCircle, MessageSquare, Phone, Mail, ExternalLink, FileText, Book, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I add money to my wallet?",
    answer: "You can add money to your wallet by going to the Wallet page and clicking on 'Fund Wallet'. You can fund your wallet using your debit card, bank transfer, or USSD."
  },
  {
    question: "How do I transfer money to another HovaPay user?",
    answer: "To transfer money to another HovaPay user, go to the Transfer page and enter the recipient's HovaPay username or phone number. Enter the amount and complete the transfer."
  },
  {
    question: "Is there a transaction fee for using HovaPay?",
    answer: "HovaPay charges a small fee for certain transactions. Wallet-to-wallet transfers are free, while transfers to bank accounts may attract a small fee. Bill payments also have varying fees depending on the service provider."
  },
  {
    question: "What should I do if my transaction fails?",
    answer: "If your transaction fails, the amount will be refunded to your wallet automatically. If the refund doesn't appear within 24 hours, please contact our customer support."
  },
  {
    question: "How secure is HovaPay?",
    answer: "HovaPay uses industry-standard encryption and security measures to protect your data and transactions. We also implement two-factor authentication, transaction PINs, and biometric authentication for added security."
  },
  {
    question: "How do I change my password?",
    answer: "To change your password, go to your Profile > Security, and follow the instructions for changing your password."
  }
];

const Support = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { addNotification } = useNotifications();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !message) {
      toast.error("Please fill all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Support ticket submitted successfully");
      addNotification({
        title: "Support Ticket Created",
        message: "Your support ticket has been submitted. We'll get back to you soon.",
        type: "system"
      });
      
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
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
          <h1 className="text-2xl font-bold">Help & Support</h1>
        </div>

        <Tabs defaultValue="contact">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4 text-center">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Chat with our support team in real-time
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // Open chat widget
                    const chatButton = document.querySelector('[data-testid="chat-button"]');
                    if (chatButton) {
                      (chatButton as HTMLButtonElement).click();
                    }
                  }}
                >
                  Start Chat
                </Button>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Speak directly with our customer service
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = "tel:+2348000000000"}
                >
                  080 0000 0000
                </Button>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Send us an email and we'll respond ASAP
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = "mailto:support@hovapay.com"}
                >
                  support@hovapay.com
                </Button>
              </Card>
            </div>
            
            <Card className="p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Submit a Support Ticket</h2>
              
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's your issue about?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue in detail"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Submit Ticket
                </Button>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="faqs">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <button
                      className="flex justify-between items-center w-full text-left"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <h3 className="font-medium">{faq.question}</h3>
                      <div className="bg-muted rounded-full p-1">
                        {expandedFaq === index ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        )}
                      </div>
                    </button>
                    
                    {expandedFaq === index && (
                      <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-3">
                    <Book className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">User Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn how to use HovaPay with our comprehensive guide
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 flex items-center justify-center"
                  onClick={() => window.open("https://docs.hovapay.com/guide", "_blank")}
                >
                  View Guide
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full mr-3">
                    <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Terms & Conditions</h3>
                    <p className="text-sm text-muted-foreground">
                      Read our terms of service and privacy policy
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 flex items-center justify-center"
                  onClick={() => window.open("https://hovapay.com/terms", "_blank")}
                >
                  View Terms
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-3">
                    <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Video Tutorials</h3>
                    <p className="text-sm text-muted-foreground">
                      Watch tutorials on how to use HovaPay features
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 flex items-center justify-center"
                  onClick={() => window.open("https://youtube.com/hovapay", "_blank")}
                >
                  Watch Videos
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-3">
                    <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Community Forum</h3>
                    <p className="text-sm text-muted-foreground">
                      Join our community to get help from other users
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 flex items-center justify-center"
                  onClick={() => window.open("https://community.hovapay.com", "_blank")}
                >
                  Join Community
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Support;
