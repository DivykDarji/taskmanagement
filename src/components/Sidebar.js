import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, userId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID"); // Remove userID as well if needed
    navigate("/login");
  };

  const handleDashboardClick = () => {
    navigate(`/admin/dashboard/`);
    toggleSidebar(); // Close sidebar after navigation
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Menu</h2>
      </div>
      <div className="sidebar-items">
        <div className="sidebar-item" onClick={handleDashboardClick}>
          <FaHome /> Dashboard
        </div>

        {/* User Management link */}
        <Link
          to="/admin/user-management"
          className="sidebar-item"
          onClick={toggleSidebar}
        >
          <FaUsers /> Users
        </Link>

        {/* Tasks link */}
        <Link
          to="/admin/task-management"
          className="sidebar-item"
          onClick={toggleSidebar}
        >
          <FaFileAlt /> Tasks
        </Link>
      </div>
      <div className="sidebar-footer">
        {/* Logout button */}
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;



