import React from 'react';
import { useParams } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const { username } = useParams();
  console.log(username); // Add this line to log the received username

  return (
    <div className="dashboard-container"> {/* Apply a class to the container */}
      <h2>Welcome Back, {username}! 👋</h2>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
