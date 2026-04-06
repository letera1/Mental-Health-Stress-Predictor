import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaBrain, FaHeartbeat, FaMoon, FaRunning, FaSmile, 
  FaChartLine, FaSearch, FaBell, FaUser, FaArrowUp, FaArrowDown
} from "react-icons/fa";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { motion } from "framer-motion";
import "./Dashboard.css";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Sample data for mental health trends (7 days)
  const weeklyData = [
    { day: "Mon", mood: 7, stress: 3, sleep: 6.5, energy: 6 },
    { day: "Tue", mood: 6, stress: 4, sleep: 5.5, energy: 5 },
    { day: "Wed", mood: 7, stress: 3, sleep: 7, energy: 7 },
    { day: "Thu", mood: 5, stress: 5, sleep: 5, energy: 4 },
    { day: "Fri", mood: 6, stress: 4, sleep: 6, energy: 6 },
    { day: "Sat", mood: 8, stress: 2, sleep: 8, energy: 8 },
    { day: "Sun", mood: 8, stress: 2, sleep: 7.5, energy: 7 },
  ];

  // Mood distribution
  const moodData = [
    { name: "Happy", value: 35, color: "#10b981" },
    { name: "Calm", value: 25, color: "#6366f1" },
    { name: "Anxious", value: 20, color: "#f59e0b" },
    { name: "Stressed", value: 15, color: "#ef4444" },
    { name: "Tired", value: 5, color: "#94a3b8" },
  ];

  // Spending parameters (mental health factors)
  const factors = [
    { name: "Sleep", value: 75, color: "#6366f1" },
    { name: "Exercise", value: 60, color: "#14b8a6" },
    { name: "Social", value: 45, color: "#a855f7" },
    { name: "Study", value: 80, color: "#f59e0b" },
    { name: "Relax", value: 55, color: "#ec4899" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="dashboard-page">
      {/* Top Header */}
      <div className="dashboard-topbar">
        <div className="topbar-left">
          <h1 className="page-title">{greeting}, welcome back</h1>
        </div>
        <div className="topbar-right">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="icon-btn">
            <FaBell />
          </button>
          <div className="user-avatar">
            <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="User" />
          </div>
        </div>
      </div>

      <motion.div 
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats Cards Row */}
        <div className="stats-row">
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-header">
              <span className="stat-label">Wellness Score</span>
              <select className="stat-dropdown">
                <option>Last week</option>
                <option>Last month</option>
              </select>
            </div>
            <div className="stat-value">72.5%</div>
            <div className="stat-change positive">
              <FaArrowUp /> 5.2% from last week
            </div>
            <div className="stat-chart">
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={2} fill="url(#colorMood)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-header">
              <span className="stat-label">Stress Level</span>
              <select className="stat-dropdown">
                <option>Last week</option>
                <option>Last month</option>
              </select>
            </div>
            <div className="stat-value stress">3.2/5</div>
            <div className="stat-change negative">
              <FaArrowDown /> 0.8 from last week
            </div>
            <div className="stat-chart">
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="stress" stroke="#a855f7" strokeWidth={2} fill="url(#colorStress)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div className="stat-card highlight" variants={itemVariants}>
            <div className="stat-header">
              <span className="stat-label">Active Days</span>
              <span className="stat-badge">This week</span>
            </div>
            <div className="stat-value-large">5/7</div>
            <div className="stat-info">Days with good activity</div>
            <div className="stat-detail">
              <div className="detail-item">
                <FaMoon />
                <span>6.8h avg sleep</span>
              </div>
              <div className="detail-item">
                <FaRunning />
                <span>7.2k steps</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-header">
              <span className="stat-label">Mood Distribution</span>
            </div>
            <div className="donut-chart">
              <ResponsiveContainer width="100%" height={120}>
                <PieChart>
                  <Pie
                    data={moodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {moodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mood-legend">
              {moodData.slice(0, 3).map((item, index) => (
                <div key={index} className="legend-item">
                  <span className="legend-dot" style={{ background: item.color }}></span>
                  <span className="legend-label">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Weekly Trends Chart */}
          <motion.div className="chart-card large" variants={itemVariants}>
            <div className="card-header">
              <h3 className="card-title">Mental Health Trends</h3>
              <select className="card-dropdown">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="gradMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1e293b', 
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
                <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={2} fill="url(#gradMood)" name="Mood" />
                <Area type="monotone" dataKey="energy" stroke="#14b8a6" strokeWidth={2} fill="url(#gradEnergy)" name="Energy" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Factors Progress */}
          <motion.div className="chart-card" variants={itemVariants}>
            <div className="card-header">
              <h3 className="card-title">Wellness Factors</h3>
            </div>
            <div className="factors-list">
              {factors.map((factor, index) => (
                <div key={index} className="factor-item">
                  <div className="factor-header">
                    <span className="factor-name">{factor.name}</span>
                    <span className="factor-percent">{factor.value}%</span>
                  </div>
                  <div className="factor-bar-bg">
                    <motion.div 
                      className="factor-bar"
                      style={{ background: factor.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${factor.value}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-row">
          {/* Recent Activity */}
          <motion.div className="activity-card" variants={itemVariants}>
            <div className="card-header">
              <h3 className="card-title">Recent Activity</h3>
              <Link to="/predict" className="card-link">View all</Link>
            </div>
            <div className="activity-list">
              {[
                { icon: <FaBrain />, title: "Completed Assessment", time: "2 hours ago", amount: "Score: 72%" },
                { icon: <FaMoon />, title: "Sleep Logged", time: "Yesterday", amount: "7.5 hours" },
                { icon: <FaRunning />, title: "Exercise Session", time: "2 days ago", amount: "45 min" },
                { icon: <FaSmile />, title: "Mood Check-in", time: "3 days ago", amount: "Positive" },
              ].map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                  <div className="activity-amount">{activity.amount}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div className="actions-card" variants={itemVariants}>
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="actions-grid">
              <Link to="/predict" className="action-btn primary">
                <FaChartLine />
                <span>Take Assessment</span>
              </Link>
              <Link to="/resources" className="action-btn">
                <FaBrain />
                <span>Resources</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
