// Contact.js
import React from 'react';
import './Contact.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faWhatsapp, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  return (
    <div className='contact-container'>
      <h2>Contact Information</h2>
      <p>Feel Free to Reach out....Connect with me from the below platform !!</p>
      {/* Add more contact information as needed */}
      <div className="contact-icons">
        <a href="https://instagram.com/divydarji_?igshid=MzNlNGNkZWQ4Mg==" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <br />
        <a href="https://twitter.com/DivyDarji_4?t=HaE-eK1BpVbZfCs5PDTsHA&s=09" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} /> 
        </a>
        <br />
        <a href="https://wa.me/9724020904" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} /> 
        </a>
        <br />
        <a href="mailto:divydarji02@gmail.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGoogle} /> 
        </a>
        <br />
        <a href="https://www.linkedin.com/in/divy-darji-9a6a14201" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} /> 
        </a>
      </div>
    </div>
  );
};

export default Contact;
