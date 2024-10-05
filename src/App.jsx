import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Trail from './pages/Trail';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/" element={<Trail/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;