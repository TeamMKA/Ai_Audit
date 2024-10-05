import { useState, useEffect } from 'react';
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

export default function AuditForm() {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [payee, setPayee] = useState('');
  const [status, setStatus] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    // Set the initial date and time on component load
    const currentDateTime = new Date().toLocaleString();
    setDateTime(currentDateTime);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auditEntry = {
      type,
      amount,
      payee,
      status,
      dateTime, // Use the current date and time
    };
    console.log(auditEntry);
    alert("Audit submitted!");

    // Reset fields
    setType('');
    setAmount('');
    setPayee('');
    setStatus('');
    setDateTime(new Date().toLocaleString()); // Reset to current time
  };

  return (
    <Card className="w-full m-4 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>New Audit Entry</CardTitle>
        <CardDescription>Enter the details for the audit entry.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Audit Type Field */}
          <div className="space-y-2">
            <Label htmlFor="type">Audit Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select audit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary_payment">Salary Payment</SelectItem>
                <SelectItem value="equipment_purchase">Equipment Purchase</SelectItem>
                <SelectItem value="service_contract">Service Contract</SelectItem>
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
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
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Submit Audit
        </Button>
      </CardFooter>
    </Card>
  );
}
