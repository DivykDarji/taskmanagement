import React from 'react';
import { useParams } from 'react-router-dom';
import './Thankyou.css'; // Import the CSS file

const ThankYou = () => {
  const { username } = useParams();
  console.log(username); // Add this line to log the received username

  return (
    <div className="thankyou-container"> {/* Apply a class to the container */}
      <h2>Thank you for signing in, {username}!</h2>
      {/* Add your thank you content here */}
    </div>
  );
};

export default ThankYou;
