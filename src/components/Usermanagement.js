
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./UserManagement.css";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar"; // Adjust the import path if necessary

const searchIconUrl = "/search.png";

const UserManagement = ({ isAdmin, userId }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    fetchUsers(query);
  };

  const fetchUsers = useCallback(
    async (searchQuery) => {
      try {
        const response = await axios.get(`https://taskmangement-backend-v1o7.onrender.com/auth/users`, {
          params: {
            page: currentPage,
            search: searchQuery,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.users.length === 1) {
          setUsers([response.data.users[0]]);
          setTotalPages(1);
        } else {
          setUsers(response.data.users);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      navigate("/login");
      return;
    }

    fetchUsers();
  }, [fetchUsers, navigate]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://taskmangement-backend-v1o7.onrender.com/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const toggleSearchBox = () => {
    setShowSearch(!showSearch);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleContextMenu = () => {
    setShowContextMenu(!showContextMenu);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-management-container">
      <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isAdmin={isAdmin} userId={userId} />
      <div className={`content ${isOpen ? "content-shifted" : ""}`}>
        <div className="content-header">
          <div className="profile">
            <div className="profile-info">
              <h2 className="profile-name">Hello, Admin!</h2>
            </div>
          </div>
          <div className="profile-details">
            <div className="profile-info">
              <div className="profile-name-container">
                <h2 className="profile-name">Admin</h2>
                <FaAngleDown
                  className="dropdown-icon"
                  onClick={toggleContextMenu}
                />
              </div>
            </div>
            {showContextMenu && (
              <div className="context-menu active">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
        <h1>User Management</h1>
        <div className={`search-section ${showSearch ? "show-search" : ""}`}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by username or email address..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <img
              src={searchIconUrl}
              alt="Search"
              onClick={toggleSearchBox}
              className="search-icon"
            />
          </div>
        </div>
        <div className="section">
          <h2>Users</h2>
          <div className="user-list">
            {users.map((user) => (
              <div className="user-card" key={user._id}>
                <h3>{user.username}</h3>
                <p>Email: {user.email}</p>
                <p>Phone Number: {user.phonenumber}</p>
                <div className="button-container">
                  <button className="button edit-button">
                    <Link to={`/edit-user/${user._id}`}>Edit</Link>
                  </button>
                  <button
                    className="button delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

