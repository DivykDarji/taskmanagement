

import React from 'react';
import UserManagement from './src/UserManagement';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container"> {/* Apply the container class */}
      <div className="user-management-section"> {/* Apply the user management section class */}
        <UserManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;
