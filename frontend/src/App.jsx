import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Predict from "./Pages/predict/Predict";
import About from "./Pages/About/About";
import Resource from "./Pages/resource/Resource";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ minHeight: "70vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resource />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
