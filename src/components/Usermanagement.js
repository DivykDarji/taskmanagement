
  import React, { useState, useEffect, useCallback } from 'react';
  import axios from 'axios';
  import { Link } from 'react-router-dom';
  import './UserManagement.css';
  const searchIconUrl = '/search.png';


  const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const handleSearch = (event) => {
      const query = event.target.value;
      setSearchQuery(query);
      setCurrentPage(1); // Reset currentPage when the search query changes
    
      // Fetch users with the updated search query
      fetchUsers(query);
    };

    // Update the fetchUsers function to accept a search query parameter
  const fetchUsers = useCallback(async (searchQuery) => {
    try {
      console.log('Fetching users with search query:', searchQuery);
      const response = await axios.get(`http://localhost:5000/auth/users`, {
        params: {
          page: currentPage,
          search: searchQuery,
        },
      });
      console.log('Response from backend:', response.data);

      // Check if only one user is returned and update state accordingly
      if (response.data.users.length === 1) {
        setUsers([response.data.users[0]]);
        setTotalPages(1);
      } else {
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [currentPage]);
    useEffect(() => {
      fetchUsers();
    }, [fetchUsers]);

    const handleDelete = async (userId) => {
      try {
        await axios.delete(`http://localhost:5000/auth/users/${userId}`);
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

    const toggleSearchBox = () => {
      setShowSearch(!showSearch); // Toggle the state to show or hide the search box
    };
    

    return (
      <div className="container">
        <h2>User Management</h2>
        <div className={`search-section ${showSearch ? 'show-search' : ''}`}> {/* Apply show-search class conditionally */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by username or email address..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <img src={searchIconUrl} alt="Search" onClick={toggleSearchBox} className="search-icon" />
          </div>
        </div>
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