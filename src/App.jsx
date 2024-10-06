/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import TransactionHistory from "./components/TransactionHistory.jsx"
import UploadDoc from "./components/UploadDoc.jsx"
import DashBoard from "./pages/DashBoard"
import Anomalies from "./pages/Anomalies"
import Analytics from "./pages/Analytics"
import ReportBody from "./pages/Report.jsx"
import Individual from "./components/Individual"
import TransactionFrom from "./components/TransactionForm" 
import TallyReports from "./pages/TallyReports"

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/tally" element={<TallyReports/>} />
                    <Route exact path="/audits" element={<TransactionHistory />} />
                    <Route exact path="/reports" element={<ReportBody/>} />
                    <Route exact path="/new" element={<UploadDoc />} />
                    <Route exact path="/upload" element={<TransactionFrom />} />
                    <Route exact path="/anom" element={<Anomalies />} />
                    <Route exact path="/analytics" element={ <Analytics />} />
                    <Route exact path="/ind" element={ <Individual />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
