import { useState } from 'react';
import { ChevronDown, ChevronUp, Download, Share2 } from 'lucide-react';
import html2pdf from 'html2pdf.js'; // Import html2pdf

const auditData = {
  companyName: "TechCorp Solutions",
  auditPeriod: "January 1, 2023 - December 31, 2023",
  auditor: "Jane Smith, CPA",
  date: "February 15, 2024",
  findings: [
    {
      id: 1,
      category: "Financial Reporting",
      severity: "High",
      description: "Inconsistencies found in Q3 financial statements",
      recommendation: "Review and reconcile Q3 financial statements, implement additional review process"
    },
    {
      id: 2,
      category: "Internal Controls",
      severity: "Medium",
      description: "Weak access controls for financial systems",
      recommendation: "Implement stronger authentication measures and regular access reviews"
    },
    {
      id: 3,
      category: "Compliance",
      severity: "Low",
      description: "Minor discrepancies in employee time tracking",
      recommendation: "Provide additional training on time tracking procedures"
    }
  ],
  summary: "The audit revealed some areas for improvement, particularly in financial reporting and internal controls. Immediate attention is required for the high-severity findings. Overall, the company shows a commitment to compliance and continuous improvement."
};

export default function AuditReport() {
  const [expandedFindings, setExpandedFindings] = useState([]);

  const toggleFinding = (id) => {
    setExpandedFindings(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Function to download the PDF
  const downloadPdf = () => {
    const element = document.getElementById('report-content'); // Element to be converted to PDF
    const options = {
      filename: `${auditData.companyName}_Audit_Report.pdf`,
      margin: 10,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  };

  // Function to send the report via email (opens mail client)
  const shareViaEmail = () => {
    const emailSubject = encodeURIComponent(`${auditData.companyName} Audit Report`);
    const emailBody = encodeURIComponent(`Please find the audit report for ${auditData.companyName}. Download the report and attach the PDF manually.`);
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  };

  // Function to share report via WhatsApp (opens WhatsApp link)
  const shareViaWhatsApp = () => {
    const whatsappMessage = encodeURIComponent(
      `Audit Report for ${auditData.companyName}\n\nAudit Period: ${auditData.auditPeriod}\nAuditor: ${auditData.auditor}\nDate: ${auditData.date}\n\nFindings:\n` +
      auditData.findings.map(finding => 
        `${finding.category} - ${finding.severity}: ${finding.description} (Recommendation: ${finding.recommendation})`
      ).join('\n\n') + `\n\nSummary:\n${auditData.summary}`
    );
    window.open(`https://wa.me/?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div id="report-content" className="max-w-4xl mt-4 mb-4 mx-auto p-6 bg-[#d8d8cd] shadow-lg rounded-lg">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Audit Report</h1>
        <p className="text-xl text-gray-600">K J Somaiya Institue of Technology</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Audit Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Audit Period</p>
            <p className="text-lg text-gray-800">{auditData.auditPeriod}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Auditor</p>
            <p className="text-lg text-gray-800">{auditData.auditor}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Date of Report</p>
            <p className="text-lg text-gray-800">{auditData.date}</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Audit Findings</h2>
        <div className="space-y-4">
          {auditData.findings.map(finding => (
            <div key={finding.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-150 ease-in-out flex justify-between items-center"
                onClick={() => toggleFinding(finding.id)}
              >
                <span className="font-medium text-gray-800">{finding.category}</span>
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    finding.severity === 'High' ? 'bg-red-100 text-red-800' :
                    finding.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {finding.severity}
                  </span>
                  {expandedFindings.includes(finding.id) ? (
                    <ChevronUp className="ml-2 h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="ml-2 h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>
              {expandedFindings.includes(finding.id) && (
                <div className="px-4 py-3 bg-white">
                  <p className="text-gray-600 mb-2"><span className="font-medium">Description:</span> {finding.description}</p>
                  <p className="text-gray-600"><span className="font-medium">Recommendation:</span> {finding.recommendation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
        <p className="text-gray-600 leading-relaxed">{auditData.summary}</p>
      </section>

      <footer className="flex justify-end space-x-4">
        <button
          onClick={shareViaEmail}
          className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded transition-colors duration-150 ease-in-out"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share via Email
        </button>
        <button
          onClick={shareViaWhatsApp}
          className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-150 ease-in-out"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share via WhatsApp
        </button>
        <button
          onClick={downloadPdf}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-150 ease-in-out"
        >
          <Download className="mr-2 h-5 w-5" />
          Download PDF
        </button>
      </footer>
    </div>
  );
}
