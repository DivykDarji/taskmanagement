import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const { id } = useParams(); 
  

  // State to store user data
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the API
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
    <div className="dashboard-container">
      <h2>Welcome Back, {userData ? userData.username : ''}! 👋</h2>
      <p>This is your personalized dashboard.</p>
    </div>
  );
};

export default Dashboard;
 