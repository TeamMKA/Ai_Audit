import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the audit types, departments, and statuses based on the Faker data
const auditTypes = [
  "Salary Payment",
  "Equipment Purchase",
  "Service Contract",
  "Scholarship Disbursement",
  "Research Grant",
];
const departments = ["HR", "Finance", "Research", "Admissions", "IT Support"];
const statuses = ["Pending", "Completed", "Failed"];

export default function AuditForm({ passFileToParent }) {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [department, setDepartment] = useState("");
  const [payee, setPayee] = useState("");
  const [status, setStatus] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState("manual"); // 'manual' or 'csv'
  const [transactionHistory, setTransactionHistory] = useState([]); // Transaction history state

  useEffect(() => {
    const currentDateTime = new Date().toLocaleString();
    setDateTime(currentDateTime);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (uploadType === "manual") {
      const auditEntry = {
        type,
        amount,
        department,
        payee,
        status,
        dateTime,
      };

      // Add the audit entry to the transaction history
      setTransactionHistory((prevHistory) => [...prevHistory, auditEntry]);

      console.log("Manual entry added to history:", auditEntry);
      alert("Audit submitted!");

    } else {
      console.log("File upload:", file);
      // Save or pass file to parent component for further processing
      passFileToParent(file);
      alert("Audit submitted from file!");
    }

    // Reset fields for a new entry
    setType("");
    setAmount("");
    setDepartment("");
    setPayee("");
    setStatus("");
    setDateTime(new Date().toLocaleString());
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Card className="w-full m-4 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>New Audit Entry</CardTitle>
        <CardDescription>
          Choose to fill the details manually or upload a CSV/Excel file.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4 mb-4">
          <Button
            onClick={() => setUploadType("manual")}
            className={`${
              uploadType === "manual" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            Manual Entry
          </Button>
          <Button
            onClick={() => setUploadType("csv")}
            className={`${
              uploadType === "csv" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            Upload CSV/Excel
          </Button>
        </div>

        {uploadType === "manual" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Audit Type Field */}
            <div className="space-y-2">
              <Label htmlFor="type">Audit Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select audit type" />
                </SelectTrigger>
                <SelectContent>
                  {auditTypes.map((auditType) => (
                    <SelectItem key={auditType} value={auditType}>
                      {auditType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
              <Select value={department} onValueChange={setDepartment}>
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
            <Label htmlFor="fileUpload">Upload CSV/Excel File</Label>
            <Input
              id="fileUpload"
              type="file"
              accept=".csv, .xlsx"
              onChange={handleFileChange}
              className={`${file ? "bg-blue-100" : ""}`} // Highlight when a file is selected
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Submit Audit
        </Button>
      </CardFooter>

      {/* Display the transaction history */}
      <CardContent>
        <CardTitle>Transaction History</CardTitle>
        <ul>
          {transactionHistory.map((entry, index) => (
            <li key={index} className="mt-2">
              {entry.type} - {entry.amount} - {entry.department} - {entry.payee} -{" "}
              {entry.status} - {entry.dateTime}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
