import React from 'react';
import UserManagement from './components/UserManagement'; // Adjust the import path if necessary
import Sidebar from './Sidebar'; // Adjust the import path if necessary
import './AdminDashboard.css';

const AdminDashboard = ({ isOpen, toggleSidebar, isAdmin, userId }) => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isAdmin={isAdmin} userId={userId} />
      <div className={`content ${isOpen ? "content-shifted" : ""}`}>
        <div className="user-management-section">
          <UserManagement isAdmin={isAdmin} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
