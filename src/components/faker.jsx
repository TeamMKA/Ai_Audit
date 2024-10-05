import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Fake audit generator
const auditTypes = ['Salary Payment', 'Equipment Purchase', 'Service Contract', 'Scholarship Disbursement', 'Research Grant'];
const departments = ['HR', 'Finance', 'Research', 'Admissions', 'IT Support'];
const statuses = ['Pending', 'Completed', 'Failed'];

function generateFakeAuditData(numEntries) {
  const audits = [];

  for (let i = 0; i < numEntries; i++) {
    const auditEntry = {
      auditId: faker.string.uuid(),
      auditType: faker.helpers.arrayElement(auditTypes),
      department: faker.helpers.arrayElement(departments),
      amount: faker.finance.amount(1000, 50000, 2),
      payeeName: faker.person.fullName(),
      status: faker.helpers.arrayElement(statuses),
      date: faker.date.recent().toLocaleDateString(),
    };
    audits.push(auditEntry);
  }

  return audits;
}

export default function AuditForm() {
  // Generate mock data
  const [audits, setAudits] = useState(generateFakeAuditData(5));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Audit submitted!");

    // Optionally, reset fields or add audit data
    // setAudits([...audits, newAuditEntry]); // Add new audit
  };

  return (
    <Card className="w-full m-4 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>New Audit Entry</CardTitle>
        <CardDescription>Enter the details for the audit entry.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Example UI for the generated audit data */}
          <div className="space-y-4">
            <h2 className="font-bold">Generated Audit Entries:</h2>
            {audits.map((audit) => (
              <div key={audit.auditId} className="border p-2 rounded-md">
                <p><strong>Audit Type:</strong> {audit.auditType}</p>
                <p><strong>Department:</strong> {audit.department}</p>
                <p><strong>Amount:</strong> ${audit.amount}</p>
                <p><strong>Payee Name:</strong> {audit.payeeName}</p>
                <p><strong>Status:</strong> {audit.status}</p>
                <p><strong>Date:</strong> {audit.date}</p>
              </div>
            ))}
          </div>

          {/* Other fields for user inputs */}
          <div className="space-y-2">
            <Label htmlFor="payee">Payee Name</Label>
            <Input id="payee" placeholder="Enter payee name" />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Submit Audit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
