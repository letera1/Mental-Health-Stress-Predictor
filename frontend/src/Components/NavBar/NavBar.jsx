import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <span className="brand-text">MindCare</span>
        </Link>

        <button 
          className="nav-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <div className={`nav-links ${isMenuOpen ? "nav-links-open" : ""}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={closeMenu}
          >
            <span>Home</span>
          </Link>
          <Link 
            to="/predict" 
            className={`nav-link ${location.pathname === "/predict" ? "active" : ""}`}
            onClick={closeMenu}
          >
            <span>Assessment</span>
          </Link>
          <Link 
            to="/resources" 
            className={`nav-link ${location.pathname === "/resources" ? "active" : ""}`}
            onClick={closeMenu}
          >
            <span>Resources</span>
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
            onClick={closeMenu}
          >
            <span>About</span>
          </Link>
        </div>

        {isMenuOpen && <div className="nav-overlay" onClick={closeMenu} />}
      </div>
    </nav>
  );
}

export default Navbar;
