


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link for navigation
import './Thankyou.css';
import axios from 'axios';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ThankYou = () => {
  const { id } = useParams(); // Extract the id parameter from the URL

  // State to store user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the API using the id
        const response = await axios.get(`https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`);
        console.log('API Response:', response.data); // Log the API response
    
        // Check if the response contains user data
        if (response.data && response.data.user) {
          // Update user data state with the response data
          setUserData(response.data.user);
        } else {
          console.error('No user data found in the API response');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle specific error conditions, such as 400 Bad Request
        if (error.response && error.response.status === 400) {
          // Display a meaningful error message to the user
          // For example:
          // setError('Invalid request. Please try again.');
        }
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div>
      <div className="thankyou-container">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <h2>Thank You for Signing Up, {userData ? userData.username : ''}! 👋</h2>
            <p>To see the full website, please <Link to="/login">login</Link>.</p> {/* Add this line */}
          </>
        )}
      </div>
      <div className="social-share-container">
        <p className="share-via">Share via</p>
        <div className="social-share-buttons">
          <TwitterShareButton url={window.location.href}>
            <FontAwesomeIcon icon={faTwitter} />
          </TwitterShareButton>
          <FacebookShareButton url={window.location.href}>
            <FontAwesomeIcon icon={faFacebook} />
          </FacebookShareButton>
          <LinkedinShareButton url={window.location.href}>
            <FontAwesomeIcon icon={faLinkedin} />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
