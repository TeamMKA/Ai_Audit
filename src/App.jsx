import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Trail from "./pages/Trail"
import TransactionHistory from "./components/TransactionHistory.jsx"
import UploadDoc from "./components/UploadDoc.jsx"
import DashBoard from "./pages/DashBoard"
import Anomalies from "./pages/Anomalies"
import Analytics from "./pages/Analytics"
import ReportBody from "./pages/Report.jsx"

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/trail" element={<Trail />} />
                    <Route exact path="/audits" element={<TransactionHistory />} />
                    <Route exact path="/reports" element={<ReportBody/>} />
                    <Route exact path="/upload" element={<UploadDoc />} />
                    <Route exact path="/dashboard" element={<DashBoard />} />
                    <Route exact path="/anom" element={<Anomalies />} />
                    <Route exact path="/analytics" element={ <Analytics />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
