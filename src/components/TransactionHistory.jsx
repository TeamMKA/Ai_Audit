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
} from "@/components/ui/select";
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
            <h2 className="text-2xl font-bold mb-4">Audit History</h2>

            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    {/* Select Audit Category */}
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Categories</SelectItem>
                            {Object.entries(auditCategories).map(([key, label]) => (
                                <SelectItem key={key} value={label}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={handleSubmit}>
                        Add Audit Entry
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>TYPE</TableHead>
                        <TableHead>AMOUNT</TableHead>
                        <TableHead>DEPARTMENT</TableHead>
                        <TableHead>PAYEE NAME</TableHead> {/* Updated to 'payee' */}
                        <TableHead>STATUS</TableHead>
                        <TableHead>DATE</TableHead> {/* Updated to 'date' */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {audits
                        .filter(
                            (audit) =>
                                selectedCategory === "All" || audit.category === selectedCategory
                        )
                        .map((audit) => (
                            <TableRow key={audit.id}>
                                <TableCell>{audit.type}</TableCell>
                                <TableCell>${audit.amount}</TableCell>
                                <TableCell>{audit.department}</TableCell>
                                <TableCell>{audit.payee}</TableCell> {/* Updated to 'payee' */}
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            audit.status === "Completed"
                                                ? "bg-green-100 text-green-800"
                                                : audit.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {audit.status}
                                    </span>
                                </TableCell>
                                <TableCell>{audit.dateTime}</TableCell> 
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}
