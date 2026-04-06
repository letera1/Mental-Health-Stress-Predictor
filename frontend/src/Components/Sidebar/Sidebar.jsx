import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaChartLine, FaClipboardList, FaBook, 
  FaUsers, FaCog, FaBars, FaTimes
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { path: "/", icon: <FaChartLine />, label: "Dashboard" },
    { path: "/predict", icon: <FaClipboardList />, label: "Assessment" },
    { path: "/resources", icon: <FaBook />, label: "Resources" },
    { path: "/about", icon: <FaUsers />, label: "About" },
    { path: "/settings", icon: <FaCog />, label: "Settings" },
  ];

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="mobile-sidebar-toggle" onClick={toggleMobile}>
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && <div className="sidebar-overlay" onClick={toggleMobile} />}

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo/Brand */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">🧠</div>
            <span className="brand-text">MindCare</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
