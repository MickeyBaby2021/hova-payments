
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  balance: number;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean;
  addToBalance: (amount: number) => void;
  deductFromBalance: (amount: number) => boolean;
}

const defaultUser: User = {
  name: "Rupak Chakraborty",
  email: "rupak@example.com",
  balance: 50000,
  avatar: "https://i.pravatar.cc/150?img=8",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(defaultUser);
  const [isLoading, setIsLoading] = useState(false);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const addToBalance = (amount: number) => {
    if (amount <= 0) return;
    
    setUserState((prev) => {
      if (!prev) return prev;
      
      const newBalance = prev.balance + amount;
      toast.success(`₦${amount.toLocaleString()} added to your wallet!`);
      
      return {
        ...prev,
        balance: newBalance,
      };
    });
  };

  const deductFromBalance = (amount: number): boolean => {
    if (amount <= 0) return false;
    
    let success = false;
    
    setUserState((prev) => {
      if (!prev) return prev;
      
      if (prev.balance < amount) {
        toast.error("Insufficient balance");
        return prev;
      }
      
      const newBalance = prev.balance - amount;
      toast.success(`₦${amount.toLocaleString()} deducted from your wallet`);
      success = true;
      
      return {
        ...prev,
        balance: newBalance,
      };
    });
    
    return success;
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, addToBalance, deductFromBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
