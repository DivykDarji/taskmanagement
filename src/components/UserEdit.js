
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserEdit.css';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      phonenumber: '',
      password: '',
    });
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`);
          const userData = response.data.user; // Assuming the user data is nested under a 'user' property
          setFormData({
            username: userData.username || '',
            email: userData.email || '',
            phonenumber: userData.phonenumber || '',
            password: '', // Assuming you don't want to display the password
          });
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }, [id]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (e) => {
      const { value } = e.target;
      setFormData({ ...formData, password: value });
    };
  
    const updateUser = async (event) => {
      event.preventDefault();
      try {
        await axios.put(`https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`, formData);
        navigate('/user-management');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  
    return (
      <div className="UserEdit-container">
        <h2 className="UserEdit-title">Edit User</h2>
        <form className="UserEdit-form" onSubmit={updateUser}>
          <input className="UserEdit-input" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
          <input className="UserEdit-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
          <input className="UserEdit-input" type="tel" name="phonenumber" placeholder="Phone Number" value={formData.phonenumber} onChange={handleInputChange} required />
          <input className="UserEdit-input" type="password" name="password" placeholder="New Password" value={formData.password} onChange={handlePasswordChange} />
          <button className="UserEdit-button" type="submit">Update User</button>
        </form>
      </div>
    );
};

export default UserEdit;
