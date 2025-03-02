
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, MessageSquare, ExternalLink } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const whatsappNumber = "07044040403";

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate agent response after a delay
    setTimeout(() => {
      const agentMessage: Message = {
        id: messages.length + 2,
        text: "Thanks for your message! To continue this conversation, click the 'Continue on WhatsApp' button below.",
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const openWhatsApp = () => {
    // Format the message with the chat history
    const formattedMessages = messages
      .map(msg => `${msg.sender === 'user' ? 'Me' : 'Agent'}: ${msg.text}`)
      .join('\n');
    
    const whatsappMessage = encodeURIComponent(`Chat history:\n${formattedMessages}\n\nI'd like to continue our conversation.`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success("Connecting to WhatsApp support...");
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-20 right-4 w-80 sm:w-96 z-50 rounded-lg shadow-lg overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-black border border-gray-700' : 'bg-white border border-gray-200'} max-h-[500px]`}>
      <div className="chat-widget-header bg-primary p-3 flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-primary-foreground" />
          <span className="text-primary-foreground font-medium">Chat Support</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-primary-foreground hover:bg-primary-foreground/10">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className={`flex-1 p-4 overflow-y-auto ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`} style={{ maxHeight: "350px" }}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
          >
            <div className={`p-3 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              {message.text}
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={`p-3 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} flex flex-col`}>
        <div className="flex items-center mb-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow mr-2"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white border-0"
          onClick={openWhatsApp}
        >
          <span>Continue on WhatsApp</span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatWidget;
