import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Trail from "./pages/Trail"
import TransactionHistory from "./components/TransactionHistory.jsx"
import UploadDoc from "./components/UploadDoc.jsx"

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/" element={<Trail />} />
                    <Route exact path="/history" element={<TransactionHistory />} />

                    <Route exact path="/upload" element={<UploadDoc />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App
