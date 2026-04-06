import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaBrain, FaHeartbeat, FaMoon, FaRunning, FaSmile, 
  FaChartLine, FaCalendarAlt, FaArrowRight, FaExclamationTriangle,
  FaCheckCircle, FaLightbulb, FaBook
} from "react-icons/fa";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { motion } from "framer-motion";
import "./Dashboard.css";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Sample data for mental health trends (7 days)
  const weeklyTrends = [
    { day: "Mon", stress: 3, mood: 7, sleep: 6.5, energy: 6 },
    { day: "Tue", stress: 4, mood: 6, sleep: 5.5, energy: 5 },
    { day: "Wed", stress: 3, mood: 7, sleep: 7, energy: 7 },
    { day: "Thu", stress: 5, mood: 5, sleep: 5, energy: 4 },
    { day: "Fri", stress: 4, mood: 6, sleep: 6, energy: 6 },
    { day: "Sat", stress: 2, mood: 8, sleep: 8, energy: 8 },
    { day: "Sun", stress: 2, mood: 8, sleep: 7.5, energy: 7 },
  ];

  // Mental health factors distribution
  const factorsData = [
    { name: "Sleep Quality", value: 75, color: "#6366f1" },
    { name: "Physical Activity", value: 60, color: "#14b8a6" },
    { name: "Social Connection", value: 55, color: "#a855f7" },
    { name: "Academic Stress", value: 40, color: "#f59e0b" },
    { name: "Self-Care", value: 65, color: "#ec4899" },
  ];

  // Wellness score breakdown
  const wellnessBreakdown = [
    { category: "Mental", score: 72 },
    { category: "Physical", score: 68 },
    { category: "Emotional", score: 75 },
    { category: "Social", score: 65 },
    { category: "Academic", score: 70 },
  ];

  // Quick stats
  const stats = [
    {
      icon: <FaBrain />,
      label: "Wellness Score",
      value: "72%",
      change: "+5%",
      positive: true,
      color: "#6366f1"
    },
    {
      icon: <FaMoon />,
      label: "Avg Sleep",
      value: "6.8h",
      change: "+0.5h",
      positive: true,
      color: "#a855f7"
    },
    {
      icon: <FaRunning />,
      label: "Activity Level",
      value: "7.2k",
      change: "+12%",
      positive: true,
      color: "#14b8a6"
    },
    {
      icon: <FaSmile />,
      label: "Mood Score",
      value: "7.1/10",
      change: "+0.8",
      positive: true,
      color: "#ec4899"
    },
  ];

  // Recent activities
  const recentActivities = [
    { icon: <FaCheckCircle />, text: "Completed daily assessment", time: "2 hours ago", type: "success" },
    { icon: <FaBook />, text: "Read wellness article", time: "5 hours ago", type: "info" },
    { icon: <FaLightbulb />, text: "Practiced meditation", time: "1 day ago", type: "success" },
    { icon: <FaExclamationTriangle />, text: "High stress detected", time: "2 days ago", type: "warning" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
      <motion.div 
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="dashboard-header" variants={itemVariants}>
          <div className="header-content">
            <h1 className="dashboard-title">{greeting}, Welcome Back</h1>
            <p className="dashboard-subtitle">Here's your mental wellness overview</p>
          </div>
          <Link to="/predict" className="btn-take-assessment">
            <FaChartLine />
            Take Assessment
          </Link>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div className="stats-grid" variants={itemVariants}>
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stat-card"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <span className="stat-label">{stat.label}</span>
                <div className="stat-value-row">
                  <span className="stat-value">{stat.value}</span>
                  <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Row 1 */}
        <div className="charts-row">
          {/* Weekly Trends */}
          <motion.div className="chart-card large" variants={itemVariants}>
            <div className="chart-header">
              <h3 className="chart-title">Weekly Mental Health Trends</h3>
              <select className="chart-filter">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(30, 41, 59, 0.95)', 
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={3} name="Mood" />
                <Line type="monotone" dataKey="energy" stroke="#14b8a6" strokeWidth={3} name="Energy" />
                <Line type="monotone" dataKey="sleep" stroke="#a855f7" strokeWidth={3} name="Sleep (hrs)" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Wellness Breakdown */}
          <motion.div className="chart-card" variants={itemVariants}>
            <div className="chart-header">
              <h3 className="chart-title">Wellness Breakdown</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={wellnessBreakdown}>
                <PolarGrid stroke="rgba(148, 163, 184, 0.2)" />
                <PolarAngleAxis dataKey="category" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="charts-row">
          {/* Stress Levels */}
          <motion.div className="chart-card" variants={itemVariants}>
            <div className="chart-header">
              <h3 className="chart-title">Stress Levels</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(30, 41, 59, 0.95)', 
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9'
                  }} 
                />
                <Bar dataKey="stress" fill="url(#stressGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Factors Distribution */}
          <motion.div className="chart-card" variants={itemVariants}>
            <div className="chart-header">
              <h3 className="chart-title">Contributing Factors</h3>
            </div>
            <div className="factors-list">
              {factorsData.map((factor, index) => (
                <div key={index} className="factor-item">
                  <div className="factor-info">
                    <span className="factor-name">{factor.name}</span>
                    <span className="factor-value">{factor.value}%</span>
                  </div>
                  <div className="factor-bar">
                    <motion.div 
                      className="factor-fill"
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

          {/* Recent Activity */}
          <motion.div className="chart-card" variants={itemVariants}>
            <div className="chart-header">
              <h3 className="chart-title">Recent Activity</h3>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity, index) => (
                <motion.div 
                  key={index} 
                  className={`activity-item ${activity.type}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.text}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div className="quick-actions" variants={itemVariants}>
          <h3 className="section-title">Quick Actions</h3>
          <div className="actions-grid">
            <Link to="/predict" className="action-card">
              <FaChartLine className="action-icon" />
              <span>Take Assessment</span>
              <FaArrowRight className="action-arrow" />
            </Link>
            <Link to="/resources" className="action-card">
              <FaBook className="action-icon" />
              <span>View Resources</span>
              <FaArrowRight className="action-arrow" />
            </Link>
            <Link to="/about" className="action-card">
              <FaLightbulb className="action-icon" />
              <span>Learn More</span>
              <FaArrowRight className="action-arrow" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
