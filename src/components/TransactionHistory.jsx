import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const transactions = [
    {
        type: "Sent",
        amount: "- 500.00",
        currency: "IDR",
        paymentMethod: "Credit Card",
        status: "Success",
        activity: "Sending money to Raihan Fikri",
    },
    {
        type: "Sent",
        amount: "- 200,000",
        currency: "IDR",
        paymentMethod: "Wire Transfer",
        status: "Success",
        activity: "Sending money to Bani Zuhilmin",
    },
    {
        type: "Received",
        amount: "+ 1,500",
        currency: "USD",
        paymentMethod: "Bank Transfer",
        status: "Success",
        activity: "Received money from Andrew",
    },
    {
        type: "Received",
        amount: "+ 2,500",
        currency: "USD",
        paymentMethod: "PayPal",
        status: "Success",
        activity: "Payment for product",
    },
    {
        type: "Received",
        amount: "+ 1,500",
        currency: "USD",
        paymentMethod: "Payoneer",
        status: "Incomplete",
        activity: "Payment for invoice",
    },
    {
        type: "Converted",
        amount: "400,000",
        currency: "IDR",
        paymentMethod: "Debit Card",
        status: "Failed",
        activity: "Convert money from USD to IDR",
    },
    {
        type: "Received",
        amount: "+ 500",
        currency: "USD",
        paymentMethod: "Credit Card",
        status: "Success",
        activity: "Received money from Bani Zuhilmin",
    },
]

export default function TransactionHistory() {
    const [dateRange, setDateRange] = useState("Last 7 days")
    const [transactionType, setTransactionType] = useState("All")

    return (
        <div className="container mx-auto p-4">
            {/* <header className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">Arto+</h1>
                    <Select defaultValue="Bagus Fikri">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Bagus Fikri">
                                Bagus Fikri
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="Fikri Shop">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select shop" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Fikri Shop">
                                Fikri Shop
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search"
                        className="pl-10 w-[300px]"
                    />
                </div>
            </header> */}

            <nav className="flex space-x-4 mb-6">
                <Button variant="ghost">Overview</Button>
                <Button variant="ghost">Arto+</Button>
                <Button variant="ghost">Activities</Button>
                <Button variant="ghost">Products</Button>
                <Button variant="ghost">Billing</Button>
                <Button variant="ghost">People</Button>
                <Button variant="ghost">Report</Button>
            </nav>

            <h2 className="text-2xl font-bold mb-4">Activities</h2>

            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Last 7 days">
                                Last 7 days
                            </SelectItem>
                            <SelectItem value="Last 30 days">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="Last 90 days">
                                Last 90 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        15 Mar - 22 Mar <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        className={
                            transactionType === "All" ? "bg-gray-200" : ""
                        }
                        onClick={() => setTransactionType("All")}
                    >
                        All 35
                    </Button>
                    <Button
                        variant="outline"
                        className={
                            transactionType === "Received" ? "bg-gray-200" : ""
                        }
                        onClick={() => setTransactionType("Received")}
                    >
                        Received 15
                    </Button>
                    <Button
                        variant="outline"
                        className={
                            transactionType === "Sent" ? "bg-gray-200" : ""
                        }
                        onClick={() => setTransactionType("Sent")}
                    >
                        Sent 5
                    </Button>
                    <Button
                        variant="outline"
                        className={
                            transactionType === "Convert" ? "bg-gray-200" : ""
                        }
                        onClick={() => setTransactionType("Convert")}
                    >
                        Convert 10
                    </Button>
                    <Select defaultValue="USD">
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="IDR">IDR</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>TYPE</TableHead>
                        <TableHead>AMOUNT</TableHead>
                        <TableHead>PAYMENT METHOD</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>ACTIVITY</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div
                                    className={`flex items-center ${
                                        transaction.type === "Sent"
                                            ? "text-red-500"
                                            : transaction.type === "Received"
                                            ? "text-green-500"
                                            : "text-blue-500"
                                    }`}
                                >
                                    {transaction.type === "Sent" && (
                                        <span className="mr-2">↑</span>
                                    )}
                                    {transaction.type === "Received" && (
                                        <span className="mr-2">↓</span>
                                    )}
                                    {transaction.type === "Converted" && (
                                        <span className="mr-2">↔</span>
                                    )}
                                    {transaction.type}
                                </div>
                            </TableCell>
                            <TableCell>
                                {transaction.amount} {transaction.currency}
                            </TableCell>
                            <TableCell>{transaction.paymentMethod}</TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                        transaction.status === "Success"
                                            ? "bg-green-100 text-green-800"
                                            : transaction.status ===
                                              "Incomplete"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {transaction.status}
                                </span>
                            </TableCell>
                            <TableCell>{transaction.activity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
