
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTasks, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = ({ isOpen, toggleSidebar, isAdmin, userId }) => {
  const [userCount, setUserCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('http://localhost:5000/auth/count', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserCount(response.data.userCount);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    const fetchTaskCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('http://localhost:5000/tasks/count', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTaskCount(response.data.taskCount);
      } catch (error) {
        console.error('Error fetching task count:', error);
      }
    };

    fetchUserCount();
    fetchTaskCount();
  }, []);

  const toggleContextMenu = () => {
    setShowContextMenu(!showContextMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard-container">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isAdmin={isAdmin} userId={userId} />
      <div className={`content ${isOpen ? 'content-shifted' : ''}`}>
        <div className="greeting-section">
          <h2 className="greeting">Hello, admin!</h2>
          <div className="profile-details">
            <div className="profile-info">
              <div className="profile-name-container">
                <h2 className="profile-name">Admin</h2>
                <FontAwesomeIcon
                  icon={faAngleDown}
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
        <div className="summary-section">
          <Link
          to="/admin/user-management"
            className="summary-card"
          >
            <div className="summary-card-content">
              <FontAwesomeIcon icon={faUsers} className="icon" />
              <div className="card-content">
                <h3 className="summary-title">Users</h3>
                <p className="summary-number">{userCount}</p>
              </div>
            </div>
          </Link>
          <Link to="/admin/task-management" className="summary-card">
            <div className="summary-card-content">
              <FontAwesomeIcon icon={faTasks} className="icon" />
              <div className="card-content">
                <h3 className="summary-title">Tasks</h3>
                <p className="summary-number">{taskCount}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;




