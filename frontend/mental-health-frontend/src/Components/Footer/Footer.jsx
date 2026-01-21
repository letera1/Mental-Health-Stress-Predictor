import { FaHeart, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">MindCare</h3>
          <p className="footer-description">
            Empowering students with AI-driven mental health insights and support.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/predict">Assessment</a></li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Emergency</h4>
          <p className="footer-emergency">
            If you're in crisis, call <strong>988</strong> (Suicide & Crisis Lifeline)
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Connect</h4>
          <div className="footer-social">
            <a href="mailto:support@mindcare.com" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} MindCare. Made with <FaHeart className="heart-icon" /> for mental wellness.
        </p>
        <p className="footer-disclaimer">
          For educational purposes only. Not a substitute for professional medical advice.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
