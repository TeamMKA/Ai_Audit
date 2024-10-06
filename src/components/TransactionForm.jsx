import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Papa from "papaparse" // For CSV parsing
import * as XLSX from "xlsx" // For Excel parsing
import { db } from "../service/firebase.js" // Firebase setup
import { collection, addDoc } from "firebase/firestore" // Firestore functions

const auditTypes = [
    "Salary Payment",
    "Equipment Purchase",
    "Service Contract",
    "Scholarship Disbursement",
    "Research Grant",
]
const departments = ["HR", "Finance", "Research", "Admissions", "IT Support"]
const statuses = ["Pending", "Completed", "Failed"]

export default function AuditForm() {
    const [dataType, setDataType] = useState("transaction") // New state for data type
    const [type, setType] = useState("")
    const [amount, setAmount] = useState("")
    const [department, setDepartment] = useState("")
    const [payee, setPayee] = useState("")
    const [status, setStatus] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [file, setFile] = useState(null)
    const [uploadType, setUploadType] = useState("manual")
    const [transactionHistory, setTransactionHistory] = useState([])

    useEffect(() => {
        // Load existing audit data from local storage
        const storedAudits = JSON.parse(localStorage.getItem("audits")) || []
        setTransactionHistory(storedAudits)

        // Auto-fill current date and time
        const currentDateTime = new Date().toLocaleString()
        setDateTime(currentDateTime)
    }, [])

    const addAuditEntry = async (newEntry) => {
        try {
                const response = await fetch(
                    "https://dndck985-8000.inc1.devtunnels.ms/payments",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                ) 
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
    
            // Add the audit entry to Firestore
            const docRef = await addDoc(collection(db, "audits"), newEntry)
            console.log("Audit entry added with ID: ", docRef.id)

            // Update local transaction history and store it locally
            const updatedAudits = [...transactionHistory, newEntry]
            localStorage.setItem("audits", JSON.stringify(updatedAudits))
            setTransactionHistory(updatedAudits)
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    const addAnomalyEntry = async (anomalyData) => {
        try {
            // Add anomaly entry to Firestore
            const docRef = await addDoc(collection(db, "anomaly"), anomalyData)
            console.log("Anomaly entry added with ID: ", docRef.id)
        } catch (e) {
            console.error("Error adding anomaly entry: ", e)
        }
    }

    const postAuditData = async (data) => {
        try {
            const response = await fetch(
                "https://dndck985-8000.inc1.devtunnels.ms/detect",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            )

            if (!response.ok) {
                throw new Error("Network response was not ok")
            }

            const result = await response.json()
            console.log("Audit data posted successfully:", result)

            // After successful response, store anomaly data

            // Assuming the response contains an anomaly field
            const transactions = result.results || []
            for (const transaction of transactions) {
                const { Flag: flag, "Anomaly Type": anomalyType } = transaction

                // Check if there's an anomaly (flag or anomaly type)
                // Create an anomaly entry for Firestore
                const anomalyEntry = {
                    transactionId: transaction["Transaction ID"],
                    date: transaction["Date"],
                    category: transaction["Category"],
                    amount: transaction["Amount (INR)"],
                    description: transaction["Description"],
                    flag, // Store the flag (if any)
                    anomalyType, // Store the anomaly type (if any)
                    timestamp: new Date().toISOString(), // Timestamp of when the anomaly is stored
                }

                // Save the anomaly entry to Firebase
                await addAnomalyEntry(anomalyEntry)
                console.log("Anomaly entry saved:", anomalyEntry)
            }
            console.log("Anomaly data saved successfully!")
        } catch (error) {
            console.error("Error posting audit data:", error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Create audit entry for manual entry or file upload
        const auditEntry = {
            type,
            amount,
            department,
            payee,
            status,
            dateTime,
        }

        if (uploadType === "manual") {
            // Post audit data if it's of audit type
            if (dataType === "audit") {
                await postAuditData(auditEntry)
            } else {
                await addAuditEntry(auditEntry)
            }
            alert("Entry submitted successfully!")
        } else if (file) {
            await parseFile(file)
        } else {
            alert("No file selected!")
        }

        // Reset form fields
        resetFormFields()
    }

    const resetFormFields = () => {
        setType("")
        setAmount("")
        setDepartment("")
        setPayee("")
        setStatus("")
        setDateTime(new Date().toLocaleString())
        setFile(null)
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const parseFile = async (file) => {
        const fileExtension = file.name.split(".").pop().toLowerCase()

        if (fileExtension === "csv") {
            Papa.parse(file, {
                header: true,
                complete: async (result) => {
                    const parsedData = result.data.map((row) => ({
                        type: row.type || "",
                        amount: row.amount || "",
                        department: row.department || "",
                        payee: row.payee || "",
                        status: row.status || "",
                        dateTime: row.dateTime || new Date().toLocaleString(),
                    }))

                    // Process each parsed entry
                    for (const auditEntry of parsedData) {
                        if (dataType === "audit") {
                            await postAuditData(auditEntry)
                            break
                        } else {
                            await addAuditEntry(auditEntry)
                        }
                    }

                    alert("CSV File Uploaded Successfully!")
                },
            })
        } else if (["xls", "xlsx"].includes(fileExtension)) {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result)
                const workbook = XLSX.read(data, { type: "array" })
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
                const jsonData = XLSX.utils.sheet_to_json(firstSheet)

                const parsedData = jsonData.map((row) => ({
                    type: row.type || "",
                    amount: row.amount || "",
                    department: row.department || "",
                    payee: row.payee || "",
                    status: row.status || "",
                    dateTime: row.dateTime || new Date().toLocaleString(),
                }))

                // Process each parsed entry
                for (const auditEntry of parsedData) {
                    if (dataType === "audit") {
                        await postAuditData(auditEntry)
                    } else {
                        await addAuditEntry(auditEntry)
                    }
                }

                alert("Excel File Uploaded Successfully!")
            }
            reader.readAsArrayBuffer(file)
        } else {
            alert("Unsupported file format. Please upload a CSV or Excel file.")
        }
    }

    return (
        <Card className="w-full m-4 max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>New Entry</CardTitle>
                <CardDescription>
                    Choose to fill the details manually or upload a CSV/Excel
                    file.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center space-x-4 mb-4">
                    <Button
                        onClick={() => setUploadType("manual")}
                        className={`${
                            uploadType === "manual"
                                ? "bg-black text-white"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        Manual Entry
                    </Button>
                    <Button
                        onClick={() => setUploadType("csv")}
                        className={`${
                            uploadType === "csv"
                                ? "bg-black text-white"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        Upload CSV/Excel
                    </Button>
                </div>

                {uploadType === "manual" ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Audit Type Field */}
                        {dataType === "audit" && (
                            <div className="space-y-2">
                                <Label htmlFor="type">Audit Type</Label>
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger id="type">
                                        <SelectValue placeholder="Select audit type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {auditTypes.map((auditType) => (
                                            <SelectItem
                                                key={auditType}
                                                value={auditType}
                                            >
                                                {auditType}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Amount Field */}
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                placeholder="Enter amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        {/* Department Field */}
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select
                                value={department}
                                onValueChange={setDepartment}
                            >
                                <SelectTrigger id="department">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Payee Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="payee">Payee Name</Label>
                            <Input
                                id="payee"
                                placeholder="Enter payee name"
                                value={payee}
                                onChange={(e) => setPayee(e.target.value)}
                            />
                        </div>

                        {/* Status Field */}
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((stat) => (
                                        <SelectItem key={stat} value={stat}>
                                            {stat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date and Time Field */}
                        <div className="space-y-2">
                            <Label htmlFor="dateTime">Date & Time</Label>
                            <Input
                                id="dateTime"
                                value={dateTime}
                                readOnly
                                placeholder="Date and time will be auto-filled"
                            />
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <Label htmlFor="dataType">Select Data Type</Label>
                            <Select
                                value={dataType}
                                onValueChange={setDataType}
                            >
                                <SelectTrigger id="dataType">
                                    <SelectValue placeholder="Select data type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="transaction">
                                        Transaction Data
                                    </SelectItem>
                                    <SelectItem value="audit">
                                        Audit Data
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Label htmlFor="fileUpload">
                            Upload CSV/Excel File
                        </Label>
                        <Input
                            id="fileUpload"
                            type="file"
                            accept=".csv, .xls, .xlsx"
                            onChange={handleFileChange}
                        />
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <Button
                    onClick={handleSubmit}
                    className="bg-black text-white"
                >
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )
}
