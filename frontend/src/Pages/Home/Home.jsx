import { Link } from "react-router-dom";
import { FaArrowRight, FaShieldAlt, FaBrain, FaChartLine, FaUsers, FaHeart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Home.css";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="home-page">
      <motion.section 
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.div className="hero-badge" variants={itemVariants}>
            <FaStar className="badge-icon" />
            <span>Mental Health & Stress Prediction for Students</span>
          </motion.div>
          
          <motion.h1 className="hero-title" variants={itemVariants}>
            Welcome to <span className="gradient-text">MindCare</span>
          </motion.h1>
          
          <motion.p className="hero-description" variants={itemVariants}>
            Your personal mental wellness companion powered by AI. Get instant insights 
            about your wellbeing through our advanced assessment tool.
          </motion.p>
          
          <motion.div className="hero-actions" variants={itemVariants}>
            <Link to="/dashboard" className="btn btn-primary">
              <FaChartLine />
              View Dashboard
              <FaArrowRight className="btn-icon" />
            </Link>
            <Link to="/predict" className="btn btn-secondary">
              Take Assessment
            </Link>
          </motion.div>
          
          <motion.div className="hero-stats" variants={itemVariants}>
            <div className="stat-item">
              <FaShieldAlt className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">100%</span>
                <span className="stat-label">Private & Secure</span>
              </div>
            </div>
            <div className="stat-item">
              <FaBrain className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">AI</span>
                <span className="stat-label">Powered</span>
              </div>
            </div>
            <div className="stat-item">
              <FaHeart className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">Free</span>
                <span className="stat-label">Always</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      <section className="features-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        
        <div className="features-grid">
          {[
            {
              icon: <FaBrain />,
              title: "Quick Assessment",
              description: "Complete a comprehensive mental health assessment in just 2-3 minutes with our intuitive form.",
              gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)"
            },
            {
              icon: <FaShieldAlt />,
              title: "Your Privacy Matters",
              description: "Zero data storage. Your responses are processed instantly and never saved to any database.",
              gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)"
            },
            {
              icon: <FaChartLine />,
              title: "Actionable Insights",
              description: "Receive personalized recommendations and access to mental health resources based on your results.",
              gradient: "linear-gradient(135deg, #f59e0b, #ef4444)"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="feature-icon" style={{ background: feature.gradient }}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="cta-content">
          <h2 className="cta-title">Ready to Check In?</h2>
          <p className="cta-description">
            Take the first step towards understanding your mental wellness. 
            It's free, private, and takes less than 5 minutes.
          </p>
          <Link to="/predict" className="btn btn-primary btn-large">
            Start Assessment Now
            <FaArrowRight className="btn-icon" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
