
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import ChatWidget from './ChatWidget';

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-24 right-4 z-40 rounded-full shadow-lg w-12 h-12 p-0"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatButton;
