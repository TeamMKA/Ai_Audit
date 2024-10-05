import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/table";

// Main audit categories
const auditCategories = {
    revenue: "Revenue",
    expenditure: "Expenditure",
    capital_expenditure: "Capital Expenditure",
    scholarships_financial_aid: "Scholarships and Financial Aid",
    loans_debt_payments: "Loans and Debt Payments",
};

// Audit types based on the categories
const auditTypes = {
    revenue: ["Grants and Donations", "Miscellaneous Income"],
    expenditure: ["Salary Payment", "Equipment Purchase", "Service Contract", "Administrative Costs"],
    capital_expenditure: ["New Infrastructure Development", "Equipment Purchases"],
    scholarships_financial_aid: ["Scholarship Disbursement", "Student Aid"],
    loans_debt_payments: ["Loan Repayment", "Interest Payments"],
};

// Departments
const departments = ["HR", "Finance", "Research", "Admissions", "IT Support"];
const statuses = ["Pending", "Completed", "Failed"];

// Fake data generator for audits
function generateFakeAuditData(numEntries) {
    const audits = [];
    for (let i = 0; i < numEntries; i++) {
        const category = faker.helpers.objectKey(auditCategories);
        const type = faker.helpers.arrayElement(auditTypes[category]);
        const auditEntry = {
            id: faker.string.uuid(),
            category: auditCategories[category], // Main category
            type,
            amount: faker.finance.amount(1000, 50000, 2),
            department: faker.helpers.arrayElement(departments),
            payeeName: faker.person.fullName(),
            status: faker.helpers.arrayElement(statuses),
            date: faker.date.recent().toLocaleDateString(),
        };
        audits.push(auditEntry);
    }
    return audits;
}

export default function AuditHistory() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [audits, setAudits] = useState([]);

    useEffect(() => {
        const data = generateFakeAuditData(15); // Generate 15 entries
        setAudits(data);
    }, []);

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
                    <Button variant="outline">
                        15 Mar - 22 Mar <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {/* <TableHead>CATEGORY</TableHead> */}
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
                                selectedCategory === "All" || audit.category === selectedCategory
                        )
                        .map((audit) => (
                            <TableRow key={audit.id}>
                                {/* <TableCell>{audit.category}</TableCell> */}
                                <TableCell>{audit.type}</TableCell>
                                <TableCell>${audit.amount}</TableCell>
                                <TableCell>{audit.department}</TableCell>
                                <TableCell>{audit.payeeName}</TableCell>
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
                                <TableCell>{audit.date}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}
