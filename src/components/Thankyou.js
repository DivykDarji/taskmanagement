// import React from 'react';
// import { useParams } from 'react-router-dom';
// import './Thankyou.css'; // Import the CSS file

// const ThankYou = () => {
//   const { username } = useParams();
//   console.log(username); // Add this line to log the received username

//   return (
//     <div className="thankyou-container"> {/* Apply a class to the container */}
//       <h2>Thank you for signing in, {username}!</h2>
//       {/* Add your thank you content here */}
//     </div>
//   );
// };

// export default ThankYou;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Thankyou.css';
import axios from 'axios';

const ThankYou = () => {
  const { id } = useParams(); // Extract the id parameter from the URL

  // State to store user data
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the API using the id
        const response = await axios.get(`http://localhost:5000/auth/users/${id}`);

        // Check if the response contains user data
        if (response.data) {
          // Update user data state with the response data
          setUserData(response.data);
        } else {
          console.error('No user data found in the API response');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div className="thankyou-container">
      <h2>Thank You for Signing Up, {userData ? userData.username : ''}! 👋</h2>
    </div>
  );
};

export default ThankYou;
