import { useEffect, useState } from "react"
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

import { db } from "../service/firebase.js" // Import your Firebase setup
import { collection, onSnapshot } from "firebase/firestore" // Import onSnapshot from Firestore

// Main audit categories
const auditCategories = {
    "Salary Payment": "Salary Payment",
    "Equipment Purchase": "Equipment Purchase",
    "Service Contract": "Service Contract",
    "Scholarship Disbursement": "Scholarship Disbursement",
    "Research Grant": "Research Grant",
}

// Audit History Component
export default function AuditHistory() {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [audits, setAudits] = useState([])

    // Real-time listener to fetch audits from Firebase Firestore
    useEffect(() => {
        const auditCollection = collection(db, "audits")

        // Use onSnapshot to listen to real-time updates
        const unsubscribe = onSnapshot(auditCollection, (snapshot) => {
            const auditList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setAudits(auditList) // Update the state with the new data
        })

        // Cleanup listener on component unmount
        return () => unsubscribe()
    }, [])

    const addAuditEntry = (newEntry) => {
        setAudits((prevAudits) => [...prevAudits, newEntry])
    }

    // Example function to generate a new audit entry (still uses faker for example purposes)
    const handleSubmit = () => {
        console.log(" Will update with firebase")
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Audit History</h2>

            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    {/* Select Audit Category */}
                    <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Categories</SelectItem>
                            {Object.entries(auditCategories).map(
                                ([key, label]) => (
                                    <SelectItem key={key} value={label}>
                                        {label}
                                    </SelectItem>
                                )
                            )}
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
                        <TableHead>PAYEE NAME</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>DATE</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {audits
                        .filter(
                            (audit) =>
                                selectedCategory === "All" ||
                                audit.category === selectedCategory
                        )
                        .map((audit) => (
                            <TableRow key={audit.id}>
                                <TableCell>{audit.type}</TableCell>
                                <TableCell>${audit.amount}</TableCell>
                                <TableCell>{audit.department}</TableCell>
                                <TableCell>{audit.payee}</TableCell>
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
    )
}
    