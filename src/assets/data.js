// data.js
import { faker } from '@faker-js/faker';

export const generateFakeAudits = (numEntries) => {
  const audits = [];

  for (let i = 0; i < numEntries; i++) {
    audits.push({
      type: faker.helpers.arrayElement([
        "Salary Payment",
        "Equipment Purchase",
        "Service Contract",
        "Scholarship Disbursement",
        "Research Grant"
      ]),
      amount: faker.finance.amount(100, 5000, 2), // Random amount between 100 and 5000
      department: faker.helpers.arrayElement([
        "HR",
        "Finance",
        "Research",
        "Admissions",
        "IT Support"
      ]),
      payee: faker.person.fullName(), // Random name
      status: faker.helpers.arrayElement([
        "Pending",
        "Completed",
        "Failed"
      ]),
      dateTime: faker.date.recent().toLocaleString(), // Recent date-time
    });
  }
  console.log(faker.person.fullName())
  return audits;
};

// Generate fake audits data
const auditData = generateFakeAudits(23); // Generate 23 fake audit entries

export default auditData;
