import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Download, Printer } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../service/firebase.js" // Adjust the path based on your structure

export default function AuditReport() {
    const [expandedFindings, setExpandedFindings] = useState([])
    const [findings, setFindings] = useState([]) // State to hold anomaly data
    const [loading, setLoading] = useState(true) // Loading state

    // Function to toggle finding visibility
    const toggleFinding = (id) => {
        setExpandedFindings((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        )
    }

    // Fetch anomaly data from Firestore
    const fetchAnomalyData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "anomaly"))
            const anomalyData = querySnapshot.docs.map((doc) => ({
                id: doc.id, // Using document ID as the finding ID
                ...doc.data(), // Spread operator to get all fields
            }))
            const filteredData = anomalyData.filter(
                (anomaly) => anomaly["anomalyType"]
            )

            setFindings(filteredData)
        } catch (error) {
            console.error("Error fetching anomaly data: ", error)
        } finally {
            setLoading(false) // Set loading to false after data fetch
        }
    }

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchAnomalyData()
    }, [])

    if (loading) {
        return <div>Loading...</div> // Show loading state
    }
    console.log(findings)
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Audit Report
                </h1>
                <p className="text-xl text-gray-600">TechCorp Solutions</p>
            </header>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Audit Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Audit Period
                        </p>
                        <p className="text-lg text-gray-800">
                            January 1, 2023 - December 31, 2023
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Auditor
                        </p>
                        <p className="text-lg text-gray-800">Jane Smith, CPA</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Date of Report
                        </p>
                        <p className="text-lg text-gray-800">
                            February 15, 2024
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Audit Findings
                </h2>
                <div className="space-y-4">
                    {findings.map((finding) => (
                        <div
                            key={finding.id}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                            <button
                                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-150 ease-in-out flex justify-between items-center"
                                onClick={() => toggleFinding(finding.id)}
                            >
                                <span className="font-medium text-gray-800">
                                    {finding.flag}
                                </span>
                                <div className="flex items-center">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded ${
                                            finding.flag === "Critical"
                                                ? "bg-red-100 text-red-800"
                                                : finding.flag === "High"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-green-100 text-green-800"
                                        }`}
                                    >
                                        {finding.flag}
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
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-medium">
                                            Name:
                                        </span>{" "}
                                        {finding.description}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">
                                            Description:
                                        </span>{" "}
                                        {finding.anomalyType}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Summary
                </h2>
                <p className="text-gray-600 leading-relaxed">
                    The audit revealed some areas for improvement, particularly
                    in financial reporting and internal controls. Immediate
                    attention is required for the high-flag findings. Overall,
                    the company shows a commitment to compliance and continuous
                    improvement.
                </p>
            </section>

            <footer className="flex justify-end space-x-4">
                <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded transition-colors duration-150 ease-in-out">
                    <Printer className="mr-2 h-5 w-5" />
                    Print Report
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-150 ease-in-out">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                </button>
            </footer>
        </div>
    )
}
