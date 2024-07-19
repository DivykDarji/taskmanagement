

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./TaskManagement.css";
import { FaAngleDown, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const searchIconUrl = "/search.png";

const TaskManagement = ({ isAdmin, userId }) => {
  const [tasks, setTasks] = useState([]);
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
    fetchTasks(query);
  };

  const fetchTasks = useCallback(async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks`, {
        params: {
          page: currentPage,
          search: searchQuery,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(response.data.tasks);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, [fetchTasks, navigate]);

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
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
    <div className="task-management-container">
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
        <h1>Task Management</h1>
        <div className={`search-section ${showSearch ? "show-search" : ""}`}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tasks..."
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
          <h2>Tasks</h2>
          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-card" key={task._id}>
                <h3>{task.title}</h3>
                <p>Description: {task.description}</p>
                <p>Due Date: {task.dueDateTime}</p>
                <p>Created By: {task.createdBy.username}</p> {/* Display the creator */}
                <div className="button-container">
                  <button
                    className="button delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(task._id);
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

export default TaskManagement;
