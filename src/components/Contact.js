// Contact.js
import React from 'react';
import './Contact.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faWhatsapp, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  return (
    <div className='contact-container'>
      <div className="contact-content">
        <h2>Let's Connect</h2>
        <p className="contact-subtitle">Feel free to reach out for collaborations or just a friendly hello</p>
        
        <div className="contact-grid">
          <div className="contact-card">
            <FontAwesomeIcon icon={faInstagram} className="icon instagram" />
            <h3>Instagram</h3>
            <a href="https://instagram.com/divydarji_?igshid=MzNlNGNkZWQ4Mg==" 
               target="_blank" 
               rel="noopener noreferrer"
               className="social-link">
              View Profile
            </a>
          </div>

          <div className="contact-card">
            <FontAwesomeIcon icon={faTwitter} className="icon twitter" />
            <h3>Twitter</h3>
            <a href="https://twitter.com/DivyDarji_4?t=HaE-eK1BpVbZfCs5PDTsHA&s=09" 
               target="_blank" 
               rel="noopener noreferrer"
               className="social-link">
              View Profile
            </a>
          </div>

          <div className="contact-card">
            <FontAwesomeIcon icon={faWhatsapp} className="icon whatsapp" />
            <h3>WhatsApp</h3>
            <a href="https://wa.me/9724020904" 
               target="_blank" 
               rel="noopener noreferrer"
               className="social-link">
              Send Message
            </a>
          </div>

          <div className="contact-card">
            <FontAwesomeIcon icon={faGoogle} className="icon gmail" />
            <h3>Email</h3>
            <a href="mailto:divydarji02@gmail.com" 
               target="_blank" 
               rel="noopener noreferrer"
               className="social-link">
              Send Email
            </a>
          </div>

          <div className="contact-card">
            <FontAwesomeIcon icon={faLinkedin} className="icon linkedin" />
            <h3>LinkedIn</h3>
            <a href="https://www.linkedin.com/in/divy-darji-9a6a14201" 
               target="_blank" 
               rel="noopener noreferrer"
               className="social-link">
              View Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
