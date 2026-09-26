import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Predict from "./Pages/predict/Predict";
import About from "./Pages/About/About";
import Resource from "./Pages/resource/Resource";
import Settings from "./Pages/Settings/Settings";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-shell">
          <Sidebar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/about" element={<About />} />
              <Route path="/resources" element={<Resource />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
