import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, FaChartBar, FaClipboardList, FaBook, 
  FaInfoCircle, FaCog, FaBell, FaSignOutAlt, FaBars, FaTimes
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/dashboard", icon: <FaChartBar />, label: "Dashboard" },
    { path: "/predict", icon: <FaClipboardList />, label: "Assessment" },
    { path: "/resources", icon: <FaBook />, label: "Resources" },
    { path: "/about", icon: <FaInfoCircle />, label: "About" },
  ];

  const bottomItems = [
    { path: "/settings", icon: <FaCog />, label: "Settings" },
    { path: "/notifications", icon: <FaBell />, label: "Notifications", badge: 3 },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo/Brand */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <span className="brand-emoji">🧠</span>
            </div>
            {!isCollapsed && (
              <div className="brand-text">
                <h2>MindCare</h2>
                <span className="brand-subtitle">Mental Wellness</span>
              </div>
            )}
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="sidebar-profile">
          <div className="profile-avatar">
            <img 
              src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=128" 
              alt="User Avatar" 
            />
            <div className="profile-status"></div>
          </div>
          {!isCollapsed && (
            <div className="profile-info">
              <h3 className="profile-name">Welcome back</h3>
              <p className="profile-email">Student User</p>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            {!isCollapsed && <span className="nav-section-title">MAIN MENU</span>}
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsMobileOpen(false)}
                    title={isCollapsed ? item.label : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && <span className="nav-label">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-section">
            {!isCollapsed && <span className="nav-section-title">OTHER</span>}
            <ul className="nav-list">
              {bottomItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsMobileOpen(false)}
                    title={isCollapsed ? item.label : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="nav-label">{item.label}</span>
                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Sign Out Button */}
        <div className="sidebar-footer">
          <button className="signout-btn" title={isCollapsed ? 'Sign out' : ''}>
            <span className="nav-icon"><FaSignOutAlt /></span>
            {!isCollapsed && <span>Sign out</span>}
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="sidebar-theme-toggle">
          <div className="theme-switch">
            <div className="theme-indicator"></div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
