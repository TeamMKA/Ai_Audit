import { useState, useEffect } from 'react';
import mockData from '../assets/tally.json'; // Import mock data

const TallyReports = () => {
  const [invoices, setInvoices] = useState([]);
  const [profitLoss, setProfitLoss] = useState({});
  const [balanceSheet, setBalanceSheet] = useState({});

  useEffect(() => {
    // Simulate fetching data from an API
    setInvoices(mockData.invoices);
    setProfitLoss(mockData.profitLoss);
    setBalanceSheet(mockData.balanceSheet);
  }, []);

  return (
    <div className="bg-gray-900 text-white p-6">
      {/* Invoices */}
      <h2 className="text-3xl font-bold my-6 border-b border-gray-700 pb-2">Invoices</h2>
      <table className="min-w-full bg-gray-800 border border-gray-600 rounded-lg shadow-md">
        <thead className="bg-gray-700">
          <tr>
            <th className="py-3 px-5 border-b">Voucher No</th>
            <th className="py-3 px-5 border-b">Customer</th>
            <th className="py-3 px-5 border-b">Amount</th>
            <th className="py-3 px-5 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index} className="hover:bg-gray-600 transition duration-200">
              <td className="py-3 px-5 border-b border-gray-600">{invoice.VoucherNo}</td>
              <td className="py-3 px-5 border-b border-gray-600">{invoice.Customer}</td>
              <td className="py-3 px-5 border-b border-gray-600">{invoice.Amount}</td>
              <td className="py-3 px-5 border-b border-gray-600">{invoice.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Profit & Loss */}
      <h2 className="text-3xl font-bold my-6 border-b border-gray-700 pb-2">Profit & Loss</h2>
      <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-md p-5">
        <p><strong>Revenue:</strong> {profitLoss.Revenue}</p>
        <p><strong>Cost of Goods Sold:</strong> {profitLoss.CostOfGoodsSold}</p>
        <p><strong>Gross Profit:</strong> {profitLoss.GrossProfit}</p>
        <p><strong>Operating Expenses:</strong> {profitLoss.OperatingExpenses}</p>
        <p><strong>Net Profit:</strong> {profitLoss.NetProfit}</p>
      </div>

      {/* Balance Sheet */}
      <h2 className="text-3xl font-bold my-6 border-b border-gray-700 pb-2">Balance Sheet</h2>
      <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-md p-5">
        <h3 className="font-semibold">Assets</h3>
        <p><strong>Cash:</strong> {balanceSheet?.Assets?.Cash}</p>
        <p><strong>Accounts Receivable:</strong> {balanceSheet?.Assets?.AccountsReceivable}</p>
        <p><strong>Inventory:</strong> {balanceSheet?.Assets?.Inventory}</p>

        <h3 className="font-semibold mt-4">Liabilities</h3>
        <p><strong>Accounts Payable:</strong> {balanceSheet?.Liabilities?.AccountsPayable}</p>
        <p><strong>Loans:</strong> {balanceSheet?.Liabilities?.Loans}</p>

        <h3 className="font-semibold mt-4">Equity</h3>
        <p><strong>Retained Earnings:</strong> {balanceSheet?.Equity?.RetainedEarnings}</p>
      </div>
    </div>
  );
};

export default TallyReports;
