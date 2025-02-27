
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const Transactions = () => {
  // This will be replaced with actual transactions data
  const transactions = [
    {
      id: 1,
      type: "credit",
      amount: 5000,
      description: "Wallet Funding",
      date: "2024-03-20",
      status: "successful",
    },
    {
      id: 2,
      type: "debit",
      amount: 1000,
      description: "Airtime Purchase",
      date: "2024-03-19",
      status: "successful",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 fade-in">
        <h1 className="text-2xl font-bold">Transaction History</h1>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {transaction.type === "credit" ? (
                        <ArrowDownCircle className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <ArrowUpCircle className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      {transaction.type}
                    </div>
                  </TableCell>
                  <TableCell>₦{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "successful"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
