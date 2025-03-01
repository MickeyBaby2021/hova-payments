
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, MessageSquare } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

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
      const agentResponses = [
        "Thanks for your message! Our team will get back to you soon.",
        "I understand. How else can I assist you?",
        "That's a great question. Let me look into that for you.",
        "I'm here to help with any questions about your account or payments.",
        "Would you like me to connect you with one of our customer service representatives?"
      ];
      
      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
      
      const agentMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
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
      
      <div className={`p-3 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} flex items-center`}>
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
    </div>
  );
};

export default ChatWidget;
