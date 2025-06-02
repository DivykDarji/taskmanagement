// LearnMore.js
import React from "react";
import "./Learnmore.css";

const Learnmore = () => {
  return (
    <div className="learn-more-container">
      <h2>TaskIT: Smart Task Management</h2>
      <p className="subtitle">Simplify your workflow with our intelligent task management solution</p>
      
      <div className="learn-section">
        <h3>Smart Technology Stack</h3>
        <div className="tech-grid">
          <div className="tech-item">
            <h4>Frontend</h4>
            <p>Built with React.js for a dynamic and responsive user interface. Deployed on Vercel for optimal performance and reliability.</p>
          </div>
          <div className="tech-item">
            <h4>Backend</h4>
            <p>Robust Node.js and Express server handling all your data operations. Hosted on Render for scalable cloud infrastructure.</p>
          </div>
          <div className="tech-item">
            <h4>Database</h4>
            <p>MongoDB Cluster providing fast, reliable, and scalable data storage for all your tasks and user information.</p>
          </div>
          <div className="tech-item">
            <h4>Authentication</h4>
            <p>Secure Firebase authentication ensuring safe access to your data and protecting user information.</p>
          </div>
        </div>
      </div>

      <div className="learn-section">
        <h3>Smart Features</h3>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🔒</span>
            <h4>Smart Security</h4>
            <p>Firebase-powered secure login and signup with real-time user session management.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <h4>Instant Updates</h4>
            <p>Real-time task updates and notifications using Firebase's real-time database capabilities.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <h4>Smart Design</h4>
            <p>Intuitive, responsive UI that adapts perfectly to any device you use.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔄</span>
            <h4>Smart Sync</h4>
            <p>Seamless data synchronization across all your devices through efficient RESTful APIs.</p>
          </div>
        </div>
      </div>

      <div className="learn-section">
        <h3>Smart Solutions</h3>
        <div className="excellence-grid">
          <div className="excellence-item">
            <h4>Smart Performance</h4>
            <p>Optimized MongoDB schemas and models for lightning-fast data operations.</p>
          </div>
          <div className="excellence-item">
            <h4>Smart Storage</h4>
            <p>Intelligent cloud storage solutions for efficient file and media management.</p>
          </div>
          <div className="excellence-item">
            <h4>Smart Code</h4>
            <p>Clean, maintainable codebase with comprehensive version control.</p>
          </div>
          <div className="excellence-item">
            <h4>Smart Scale</h4>
            <p>Built to grow with your needs through cloud-based architecture.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learnmore;
