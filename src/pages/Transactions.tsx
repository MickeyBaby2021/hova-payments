
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownCircle, ArrowUpCircle, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const Transactions = () => {
  // This will be replaced with actual transactions data
  const transactions = [
    {
      id: 1,
      type: "credit",
      amount: 5000,
      description: "Wallet Funding",
      date: "Today, 2:30 PM",
      status: "successful",
    },
    {
      id: 2,
      type: "debit",
      amount: 1000,
      description: "Airtime Purchase",
      date: "Yesterday, 4:15 PM",
      status: "successful",
    },
    {
      id: 3,
      type: "debit",
      amount: 31350,
      description: "Netflix Premium",
      date: "22 Jun 2024 - 12:00 PM",
      status: "successful",
    },
    {
      id: 4,
      type: "credit",
      amount: 58500,
      description: "Received Money",
      date: "20 Jun 2024 - 1:20 PM",
      status: "successful",
    },
    {
      id: 5,
      type: "debit",
      amount: 5850,
      description: "Spotify Premium",
      date: "19 Jun 2024 - 4:00 PM",
      status: "successful",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 fade-in max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Transactions</h1>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions" className="pl-9" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card className="p-0 divide-y">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                      }`}>
                        {transaction.type === "credit" ? (
                          <ArrowDownCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUpCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.type === "credit" ? "+" : "-"}₦{transaction.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>
          <TabsContent value="income">
            <Card className="p-0 divide-y">
              {transactions
                .filter((t) => t.type === "credit")
                .map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-green-100">
                          <ArrowDownCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="font-semibold text-green-600">
                        +₦{transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
            </Card>
          </TabsContent>
          <TabsContent value="expense">
            <Card className="p-0 divide-y">
              {transactions
                .filter((t) => t.type === "debit")
                .map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-red-100">
                          <ArrowUpCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="font-semibold text-red-600">
                        -₦{transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
