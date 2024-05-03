
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/users?page=${currentPage}`);
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handleDelete = async (userId) => {
    try {
      // Send a DELETE request to mark the user as deleted
      await axios.delete(`http://localhost:5000/auth/users/${userId}`);
  
      // Update the users state to remove the deleted user
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      <div className="user-list">
        {users.map(user => (
          <div className="user-card" key={user._id}>
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phonenumber}</p>
            <div className="button-container">
              <button className="button edit-button"><Link to={`/edit-user/${user._id}`}>Edit</Link></button>
              <button className="button delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default UserManagement;





