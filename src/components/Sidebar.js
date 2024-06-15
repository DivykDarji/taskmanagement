
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, isAdmin, userId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID"); // Remove userID as well if needed
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Menu</h2>
      </div>
      <div className="sidebar-items">
        {/* Dashboard link */}
        <Link
          to={isAdmin ? `/admin/dashboard/${userId}` : `/dashboard/${userId}`}
          className="sidebar-item"
          onClick={toggleSidebar}
        >
          <FaHome /> Dashboard
        </Link>

        {/* User Management link */}
        {isAdmin && (
          <Link to="/admin/user-management" className="sidebar-item" onClick={toggleSidebar}>
            <FaUsers /> User Management
          </Link>
        )}
        {!isAdmin && (
          <Link to="/user-management" className="sidebar-item" onClick={toggleSidebar}>
            <FaUsers /> User Management
          </Link>
        )}

        {/* Tasks link */}
        <Link to="/tasks" className="sidebar-item" onClick={toggleSidebar}>
          <FaFileAlt /> Tasks
        </Link>

        {/* Settings link */}
        <Link to="/settings" className="sidebar-item" onClick={toggleSidebar}>
          <FaCog /> Settings
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
