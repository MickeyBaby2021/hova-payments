
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, MessageSquare } from 'lucide-react';

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
    <div className="chat-widget">
      <div className="chat-widget-header">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          <span>Chat Support</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-primary-foreground/10">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="chat-widget-content">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-agent'}`}
          >
            {message.text}
            <div className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-widget-input">
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
