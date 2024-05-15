import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Calendar from 'react-calendar';
import { FaBars } from 'react-icons/fa';

const Dashboard = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar open/close 
  const [activeTab, setActiveTab] = useState('Recently');
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [userError, setUserError] = useState('');
  const [tasksError, setTasksError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/users/${id}`);
        if (response.data && response.data.user) {
          setUserData(response.data.user);
        } else {
          console.error('No user data found in the API response');
          setUserError('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserError('Failed to fetch user data');
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/user/${id}`);
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error('Tasks data is not an array:', response.data);
          setTasksError('Tasks data is invalid');
        }
      } catch (error) {
        console.error('Error fetching tasks data:', error);
        setTasksError('Failed to fetch tasks data');
      }
    };

    fetchUserData();
    fetchTasks();
  }, [id]);

  const filteredTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    if (activeTab === 'Recently') {
      return new Date(task.completedAt) > sevenDaysAgo;
    } else if (activeTab === 'Today') {
      return task.dueDate === today;
    } else if (activeTab === 'Upcoming') {
      return task.dueDate > today && task.dueDate <= sevenDaysLater.toISOString().split('T')[0];
    } else if (activeTab === 'Later') {
      return task.dueDate > sevenDaysLater.toISOString().split('T')[0];
    }
    return true;
  });

  // Format tasks data for calendar
  const formattedTasks = tasks.map(task => ({
    title: task.title,
    date: new Date(task.dueDate),
  }));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard-container">
      <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isOpen ? 'content-shifted' : ''}`}>
        <div className="content-header">
          <div className="profile">
            <h1 className="profile-name">Hello, {userData ? userData.username : 'Loading....'}!</h1>
            <p>You've got {tasks.length} tasks today</p>
          </div>
          <div className="profile-details">
            <img src="https://placehold.co/40x40" alt="Profile" className="profile-image" />
            <div className="profile-info">
              <h2 className="profile-name">{userData ? userData.username : 'Loading....'}</h2>
              {userError && <p className="error">{userError}</p>}
            </div>
          </div>
        </div>
        <div className="tasks">
          <h3 className="tasks-title">My tasks</h3>
          <div className="task-options">
            <span className={`task-option ${activeTab === 'Recently' ? 'active' : ''}`} onClick={() => setActiveTab('Recently')}>Recently</span>
            <span className={`task-option ${activeTab === 'Today' ? 'active' : ''}`} onClick={() => setActiveTab('Today')}>Today</span>
            <span className={`task-option ${activeTab === 'Upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('Upcoming')}>Upcoming</span>
            <span className={`task-option ${activeTab === 'Later' ? 'active' : ''}`} onClick={() => setActiveTab('Later')}>Later</span>
          </div>
          {tasksError ? (
            <div className="error">{tasksError}</div>
          ) : (
            <div className="task-list">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <div key={task._id} className={`task-item priority-${task.priority.toLowerCase()}`}>
                    <h3 className="task-item-title">{task.title}</h3>
                    <p className="task-description">{task.description}</p>
                    <p className="task-due-date">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <div className="no-tasks-message">
                  <p>No tasks available for the selected filter. Try adding a task!</p>
                </div>
              )}
            </div>
          )}
          <Link to={`/add-task/${id}`} className="add-task-button-link">
            <button className="add-task-button">+ Add Task</button>
          </Link>
        </div>
        <div className="calendar">
          <h3 className="calendar-title">Today</h3>
          <div className="calendar-date">{new Date().toLocaleDateString()}</div>
          <div className="calendar-tasks">
            <Calendar
              events={formattedTasks}
              // Other props for customization
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



