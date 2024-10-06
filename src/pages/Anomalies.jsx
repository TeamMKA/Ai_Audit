import { useState, useEffect } from "react"
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"
import { db } from "../service/firebase.js" // Make sure you import your Firebase config

const Anomalities = () => {
    const [selectedAnomaly, setSelectedAnomaly] = useState("Low")
    const [findings, setFindings] = useState({}) // State to hold anomaly data
    const [loading, setLoading] = useState(true) // Loading state

    // Function to fetch anomaly data from Firestore
    const fetchAnomalyData = async () => {
        try {
            const anomaliesCollection = collection(db, "anomaly") // Ensure the collection name matches your Firestore
            const anomalySnapshot = await getDocs(anomaliesCollection)
            const anomaliesList = anomalySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            // Group anomalies by flag (Low, Medium, High, Critical, Completed)
            const groupedAnomalies = anomaliesList.reduce((acc, anomaly) => {
                const flag =
                    anomaly.status === "Completed"
                        ? "Completed"
                        : anomaly.flag || "Uncategorized" // Handle missing flags
                if (!acc[flag]) {
                    acc[flag] = []
                }
                acc[flag].push(anomaly)
                return acc
            }, {})

            setFindings(groupedAnomalies) // Store the grouped anomalies in state
            setLoading(false) // Stop loading
        } catch (error) {
            console.error("Error fetching anomalies:", error)
            setLoading(false) // Stop loading in case of an error
        }
    }

    // Fetch anomaly data when component mounts
    useEffect(() => {
        fetchAnomalyData()
    }, [])

    const handleSelect = (flag) => {
        setSelectedAnomaly(flag)
    }

    const markAsCompleted = async (anomalyId) => {
        try {
            const anomalyRef = doc(db, "anomaly", anomalyId)
            await updateDoc(anomalyRef, { status: "Completed" })
            alert("Anomaly marked as completed.")
            fetchAnomalyData() // Refresh the data
        } catch (error) {
            console.error("Error marking anomaly as completed:", error)
        }
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Anomalies</h1>
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className={`px-4 py-2 rounded ${
                        selectedAnomaly === "Low"
                            ? "bg-blue-500 text-white"
                            : "bg-white text-blue-500 border border-blue-500"
                    }`}
                    onClick={() => handleSelect("Low")}
                >
                    Low
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        selectedAnomaly === "Medium"
                            ? "bg-yellow-500 text-white"
                            : "bg-white text-yellow-500 border border-yellow-500"
                    }`}
                    onClick={() => handleSelect("Medium")}
                >
                    Medium
                </button>
                {/*         <button
          className={`px-4 py-2 rounded ${selectedAnomaly === 'High' ? 'bg-red-500 text-white' : 'bg-white text-red-500 border border-red-500'}`}
          onClick={() => handleSelect('High')}
        >
          High
        </button> */}
                <button
                    className={`px-4 py-2 rounded ${
                        selectedAnomaly === "Critical"
                            ? "bg-red-500 text-white"
                            : "bg-white text-red-500 border border-red-500"
                    }`}
                    onClick={() => handleSelect("Critical")}
                >
                    Critical
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        selectedAnomaly === "Completed"
                            ? "bg-green-500 text-white"
                            : "bg-white text-green-500 border border-green-500"
                    }`}
                    onClick={() => handleSelect("Completed")}
                >
                    Completed
                </button>
            </div>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedAnomaly &&
                        findings[selectedAnomaly]?.map((anomaly) => (
                            <div
                                key={anomaly.id}
                                className="bg-white p-4 rounded shadow-md"
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    {anomaly.description || "Unnamed Anomaly"}
                                </h2>
                                <p className="text-gray-600">
                                    <strong>Type:</strong> {anomaly.anomalyType}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Category:</strong>{" "}
                                    {anomaly.category}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Transaction ID:</strong>{" "}
                                    {anomaly.transactionId}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Amount:</strong> ₹
                                    {anomaly.amount.toLocaleString()}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Date:</strong> {anomaly.date}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Timestamp:</strong>{" "}
                                    {new Date(
                                        anomaly.timestamp
                                    ).toLocaleString()}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Status:</strong>{" "}
                                    {anomaly.status || "Pending"}
                                </p>
                                {anomaly.status !== "Completed" && (
                                    <button
                                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                                        onClick={() =>
                                            markAsCompleted(anomaly.id)
                                        }
                                    >
                                        Mark as Completed
                                    </button>
                                )}
                            </div>
                        ))}
                    {(!findings[selectedAnomaly] ||
                        findings[selectedAnomaly].length === 0) && (
                        <p className="text-center">
                            No anomalies found for {selectedAnomaly} flag.
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Anomalities
