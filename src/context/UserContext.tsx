
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  balance: number;
  avatar?: string;
  phone?: string;
}

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: Date;
  status: "success" | "pending" | "failed";
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean;
  addToBalance: (amount: number) => void;
  deductFromBalance: (amount: number) => boolean;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;
  resetBalance: () => void;
  clearTransactions: () => void;
}

const defaultUser: User = {
  name: "Rupak Chakraborty",
  email: "rupak@example.com",
  balance: 0,
  avatar: "https://i.pravatar.cc/150?img=8",
  phone: "07044040403",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(defaultUser);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const addToBalance = (amount: number) => {
    if (amount <= 0) return;
    
    setUserState((prev) => {
      if (!prev) return prev;
      
      const newBalance = prev.balance + amount;
      
      addTransaction({
        type: "credit",
        amount: amount,
        description: "Wallet funding",
        status: "success"
      });
      
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
      success = true;
      
      addTransaction({
        type: "debit",
        amount: amount,
        description: "Payment",
        status: "success"
      });
      
      return {
        ...prev,
        balance: newBalance,
      };
    });
    
    return success;
  };

  const addTransaction = (transaction: Omit<Transaction, "id" | "date">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      date: new Date()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    if (transaction.type === "credit") {
      toast.success(`₦${transaction.amount.toLocaleString()} added to your wallet`);
    } else {
      toast.success(`₦${transaction.amount.toLocaleString()} has been paid successfully`);
    }
  };

  const resetBalance = () => {
    setUserState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        balance: 0
      };
    });
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      isLoading, 
      addToBalance, 
      deductFromBalance,
      transactions,
      addTransaction,
      resetBalance,
      clearTransactions
    }}>
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
