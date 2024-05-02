// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="user-profile">
      <h3>User Profile</h3>
      {error ? (
        <p>Error fetching user data: {error}</p>
      ) : (
        userData ? (
          <div>
            <p>Name: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Phone Number: {userData.phonenumber}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )
      )}
    </div>
  );
};

export default UserProfile;
