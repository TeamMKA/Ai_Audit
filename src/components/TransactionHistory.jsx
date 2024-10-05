import { useEffect, useState } from "react"
import { db } from "../service/firebase.js"
import { collection, getDocs } from "firebase/firestore"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export default function TransactionHistory() {
    const [dateRange, setDateRange] = useState("Last 7 days")
    const [transactionType, setTransactionType] = useState("All")
    const [transactions, setTransactions] = useState([])

    const transactionTypeLabels = {
        teacher_salary_payment: "Teacher Salary Payment",
        student_fee_payment: "Student Fee Payment",
        college_rent_payment: "College Rent Payment",
        logistics_payment: "Logistics Payment",
        salary_payment: "Salary Payment",
    }

    useEffect(() => {
        const fetchTransactions = async () => {
            const transactionsCollection = collection(db, "transactions")
            const transactionSnapshot = await getDocs(transactionsCollection)
            const transactionsList = transactionSnapshot.docs.map((doc) => {
                const data = doc.data()
                return {
                    id: doc.id,
                    type: data.transaction_type,
                    amount: data.payment_details.total_amount.value,
                    currency: data.payment_details.total_amount.currency,
                    name: data.payee_details
                        ? data.payee_details.name.first_name &&
                          data.payee_details.name.last_name
                            ? `${data.payee_details.name.first_name} ${data.payee_details.name.last_name}`
                            : "College"
                        : "College",
                    status: data.status,
                }
            })
            setTransactions(transactionsList)
            console.log("Transactions:", transactionsList)
        }

        fetchTransactions()
    }, [])

    return (
        <div className="container mx-auto p-4">
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
                        All {transactions.length}
                    </Button>
                    <Button
                        variant="outline"
                        className={
                            transactionType === "teacher_salary_payment"
                                ? "bg-gray-200"
                                : ""
                        }
                        onClick={() =>
                            setTransactionType("teacher_salary_payment")
                        }
                    >
                        {transactionTypeLabels.teacher_salary_payment}{" "}
                        {
                            transactions.filter(
                                (t) => t.type === "teacher_salary_payment"
                            ).length
                        }
                    </Button>
                    <Button
                        variant="outline"
                        className={
                            transactionType === "student_fee_payment"
                                ? "bg-gray-200"
                                : ""
                        }
                        onClick={() =>
                            setTransactionType("student_fee_payment")
                        }
                    >
                        {transactionTypeLabels.student_fee_payment}{" "}
                        {
                            transactions.filter(
                                (t) => t.type === "student_fee_payment"
                            ).length
                        }
                    </Button>
                    <Button
                        variant="outline"
                        className={
                            transactionType === "college_rent_payment"
                                ? "bg-gray-200"
                                : ""
                        }
                        onClick={() =>
                            setTransactionType("college_rent_payment")
                        }
                    >
                        {transactionTypeLabels.college_rent_payment}{" "}
                        {
                            transactions.filter(
                                (t) => t.type === "college_rent_payment"
                            ).length
                        }
                    </Button>
                    <Button
                        variant="outline"
                        className={
                            transactionType === "logistics_payment"
                                ? "bg-gray-200"
                                : ""
                        }
                        onClick={() => setTransactionType("logistics_payment")}
                    >
                        {transactionTypeLabels.logistics_payment}{" "}
                        {
                            transactions.filter(
                                (t) => t.type === "logistics_payment"
                            ).length
                        }
                    </Button>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>TYPE</TableHead>
                        <TableHead>AMOUNT</TableHead>
                        <TableHead>PAYEE NAME</TableHead>
                        <TableHead>STATUS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions
                        .filter(
                            (transaction) =>
                                transactionType === "All" ||
                                transaction.type === transactionType
                        )
                        .map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>
                                    {transactionTypeLabels[transaction.type] ||
                                        transaction.type}
                                </TableCell>
                                <TableCell>
                                    {transaction.amount} {transaction.currency}
                                </TableCell>
                                <TableCell>{transaction.name}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            transaction.status === "completed"
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
        </div>
    )
}
