
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const { id } = useParams(); // Extract the id parameter from the URL

  // State to store user data and loading status
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the API using the id
        const response = await axios.get(`http://localhost:5000/auth/users/${id}`);
        
        // Check if the response contains user data
        if (response.data && response.data.user) {
          // Update user data state with the response data
          setUserData(response.data.user);
        } else {
          console.error('No user data found in the API response');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        // Set loading state to false once data fetching is complete
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [id]);
  
  return (
    <div className="dashboard-container">
      {/* Display loading indicator if loading state is true */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Display welcome message and user data if available */}
          <h2>Welcome Back, {userData ? userData.username : ''}! 👋</h2>
          <p>This is your personalized dashboard.</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
