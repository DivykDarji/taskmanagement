// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import './Dashboard.css';
// import Sidebar from './Sidebar';
// import Calendar from 'react-calendar';
// import { FaBars } from 'react-icons/fa';

// const Dashboard = () => {
//   const { id } = useParams();
//   const [isOpen, setIsOpen] = useState(false); // State to control sidebar open/close
//   const [activeTab, setActiveTab] = useState('Recently');
//   const [userData, setUserData] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [userError, setUserError] = useState('');
//   const [tasksError, setTasksError] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/auth/users/${id}`);
//         if (response.data && response.data.user) {
//           setUserData(response.data.user);
//         } else {
//           console.error('No user data found in the API response');
//           setUserError('No user data found');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setUserError('Failed to fetch user data');
//       }
//     };

//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/tasks/user/${id}`);
//         if (Array.isArray(response.data)) {
//           setTasks(response.data);
//         } else {
//           console.error('Tasks data is not an array:', response.data);
//           setTasksError('Tasks data is invalid');
//         }
//       } catch (error) {
//         console.error('Error fetching tasks data:', error);
//         setTasksError('Failed to fetch tasks data');
//       }
//     };

//     fetchUserData();
//     fetchTasks();
//   }, [id]);

//   const filteredTasks = tasks.filter(task => {
//     const today = new Date().toISOString().split('T')[0];
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//     const sevenDaysLater = new Date();
//     sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

//     if (activeTab === 'Recently') {
//       return new Date(task.completedAt) > sevenDaysAgo;
//     } else if (activeTab === 'Today') {
//       return task.dueDate === today;
//     } else if (activeTab === 'Upcoming') {
//       return task.dueDate > today && task.dueDate <= sevenDaysLater.toISOString().split('T')[0];
//     } else if (activeTab === 'Later') {
//       return task.dueDate > sevenDaysLater.toISOString().split('T')[0];
//     }
//     return true;
//   });

//   // Format tasks data for calendar
//   const formattedTasks = tasks.map(task => ({
//     title: task.title,
//     date: new Date(task.dueDate),
//   }));

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="dashboard-container">
//       <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
//       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//       <div className={`content ${isOpen ? 'content-shifted' : ''}`}>
//         <div className="content-header">
//           <div className="profile">
//             <h1 className="profile-name">Hello, {userData ? userData.username : 'Loading....'}!</h1>
//             <p>You've got {tasks.length} tasks today</p>
//           </div>
//           <div className="profile-details">
//             <img src="https://placehold.co/40x40" alt="Profile" className="profile-image" />
//             <div className="profile-info">
//               <h2 className="profile-name">{userData ? userData.username : 'Loading....'}</h2>
//               {userError && <p className="error">{userError}</p>}
//             </div>
//           </div>
//         </div>
//         <div className="tasks">
//           <h3 className="tasks-title">My tasks</h3>
//           <div className="task-options">
//             <span className={`task-option ${activeTab === 'Recently' ? 'active' : ''}`} onClick={() => setActiveTab('Recently')}>Recently</span>
//             <span className={`task-option ${activeTab === 'Today' ? 'active' : ''}`} onClick={() => setActiveTab('Today')}>Today</span>
//             <span className={`task-option ${activeTab === 'Upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('Upcoming')}>Upcoming</span>
//             <span className={`task-option ${activeTab === 'Later' ? 'active' : ''}`} onClick={() => setActiveTab('Later')}>Later</span>
//           </div>
//           {tasksError ? (
//             <div className="error">{tasksError}</div>
//           ) : (
//             <div className="task-list">
//               {filteredTasks.length > 0 ? (
//                 filteredTasks.map(task => (
//                   <div key={task._id} className={`task-item priority-${task.priority.toLowerCase()}`}>
//                     <h3 className="task-item-title">{task.title}</h3>
//                     <p className="task-description">{task.description}</p>
//                     <p className="task-due-date">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
//                   </div>
//                 ))
//               ) : (
//                 <div className="no-tasks-message">
//                   <p>No tasks available for the selected filter. Try adding a task!</p>
//                 </div>
//               )}
//             </div>
//           )}
//           <Link to={`/add-task/${id}`} className="add-task-button-link">
//             <button className="add-task-button">+ Add Task</button>
//           </Link>
//         </div>
//         <div className="calendar">
//           <h3 className="calendar-title">Today</h3>
//           <div className="calendar-date">{new Date().toLocaleDateString()}</div>
//           <div className="calendar-tasks">
//             <Calendar
//               events={formattedTasks}
//               // Other props for customization
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './Dashboard.css';
// import Sidebar from './Sidebar';
// import Calendar from 'react-calendar';
// import { FaBars } from 'react-icons/fa';
// import AddTaskPage from './AddTaskPage'; // Import your AddTaskPage component

// const Dashboard = () => {
//   const { id } = useParams();
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('Recently');
//   const [userData, setUserData] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [userError, setUserError] = useState('');
//   const [tasksError, setTasksError] = useState('');
//   const [showAddTaskModal, setShowAddTaskModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/auth/users/${id}`);
//         if (response.data && response.data.user) {
//           setUserData(response.data.user);
//         } else {
//           console.error('No user data found in the API response');
//           setUserError('No user data found');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setUserError('Failed to fetch user data');
//       }
//     };

//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/tasks/user/${id}`);
//         if (Array.isArray(response.data)) {
//           setTasks(response.data);
//         } else {
//           console.error('Tasks data is not an array:', response.data);
//           setTasksError('Tasks data is invalid');
//         }
//       } catch (error) {
//         console.error('Error fetching tasks data:', error);
//         setTasksError('Failed to fetch tasks data');
//       }
//     };

//     fetchUserData();
//     fetchTasks();
//   }, [id]);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/tasks/user/${id}`);
//       if (Array.isArray(response.data)) {
//         setTasks(response.data);
//       } else {
//         console.error('Tasks data is not an array:', response.data);
//         setTasksError('Tasks data is invalid');
//       }
//     } catch (error) {
//       console.error('Error fetching tasks data:', error);
//       setTasksError('Failed to fetch tasks data');
//     }
//   };

//   const filteredTasks = tasks.filter(task => {
//     const today = new Date().toISOString().split('T')[0];
//     const sevenDaysLater = new Date();
//     sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

//     if (activeTab === 'Recently') {
//       return new Date(task.completedAt) > new Date(new Date().setDate(new Date().getDate() - 7));
//     } else if (activeTab === 'Today') {
//       return task.dueDate === today;
//     } else if (activeTab === 'Upcoming') {
//       return task.dueDate > today && task.dueDate <= sevenDaysLater.toISOString().split('T')[0];
//     } else if (activeTab === 'Later') {
//       return task.dueDate > sevenDaysLater.toISOString().split('T')[0];
//     }
//     return true;
//   });
//   const handleAddTask = () => {
//     setSuccessMessage('Task added successfully');
//     // Fetch tasks again to update the task list
//     fetchTasks();
//   };

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="dashboard-container">
//       <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
//       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//       <div className={`content ${isOpen ? 'content-shifted' : ''}`}>
//         <div className="content-header">
//           <div className="profile">
//             <h1 className="profile-name">Hello, {userData ? userData.username : 'Loading....'}!</h1>
//             <p>You've got {tasks.length} tasks today</p>
//           </div>
//           <div className="profile-details">
//             <img src="https://placehold.co/40x40" alt="Profile" className="profile-image" />
//             <div className="profile-info">
//               <h2 className="profile-name">{userData ? userData.username : 'Loading....'}</h2>
//               {userError && <p className="error">{userError}</p>}
//             </div>
//           </div>
//         </div>
//         <div className="tasks">
//           <h3 className="tasks-title">My tasks</h3>
//           <div className="task-options">
//             <span className={`task-option ${activeTab === 'Recently' ? 'active' : ''}`} onClick={() => setActiveTab('Recently')}>Recently</span>
//             <span className={`task-option ${activeTab === 'Today' ? 'active' : ''}`} onClick={() => setActiveTab('Today')}>Today</span>
//             <span className={`task-option ${activeTab === 'Upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('Upcoming')}>Upcoming</span>
//             <span className={`task-option ${activeTab === 'Later' ? 'active' : ''}`} onClick={() => setActiveTab('Later')}>Later</span>
//           </div>
//           {tasksError ? (
//             <div className="error">{tasksError}</div>
//           ) : (
//             <div className="task-list">
//               {tasks.length > 0 ? (
//                 tasks.map(task => (
//                   <div key={task._id} className={`task-item priority-${task.priority.toLowerCase()}`}>
//                     <h3 className="task-item-title">{task.title}</h3>
//                     <p className="task-description">{task.description}</p>
//                     <p className="task-due-date">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
//                   </div>
//                 ))
//               ) : (
//                 <div className="no-tasks-message">
//                   <p>No tasks available for the selected filter. Try adding a task!</p>
//                 </div>
//               )}
//             </div>
//           )}
//           <button className="add-task-button" onClick={() => setShowAddTaskModal(true)}>+ Add Task</button>
//         </div>
//         <div className="calendar">
//           <h3 className="calendar-title">Today</h3>
//           <div className="calendar-date">{new Date().toLocaleDateString()}</div>
//           <div className="calendar-tasks">
//             <Calendar
//               events={tasks.map(task => ({ title: task.title, date: new Date(task.dueDate) }))}
//               // Other props for customization
//             />
//           </div>
//         </div>
//       </div>

//       {/* Add Task Modal */}
//       {showAddTaskModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowAddTaskModal(false)}>&times;</span>
//             <AddTaskPage userId={id} closeModal={() => setShowAddTaskModal(false)} updateTasks={handleAddTask} />
//           </div>
//         </div>
//       )}

//       {/* Display Success Message */}
//       {successMessage && <div className="success-message">{successMessage}</div>}
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";
// import Sidebar from "./Sidebar";
// import Calendar from "react-calendar";
// import { FaBars, FaAngleDown } from "react-icons/fa";
// import AddTaskPage from "./AddTaskPage";

// const Dashboard = () => {
//   const { id } = useParams();
//   const navigate = useNavigate(); // Import useNavigate hook
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("Recently");
//   const [userData, setUserData] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [userError, setUserError] = useState("");
//   const [tasksError, setTasksError] = useState("");
//   const [showAddTaskModal, setShowAddTaskModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showContextMenu, setShowContextMenu] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/auth/users/${id}`
//         );
//         if (response.data && response.data.user) {
//           setUserData(response.data.user);
//         } else {
//           console.error("No user data found in the API response");
//           setUserError("No user data found");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setUserError("Failed to fetch user data");
//       }
//     };

//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/tasks/user/${id}`
//         );
//         if (Array.isArray(response.data)) {
//           setTasks(response.data);
//         } else {
//           console.error("Tasks data is not an array:", response.data);
//           setTasksError("Tasks data is invalid");
//         }
//       } catch (error) {
//         console.error("Error fetching tasks data:", error);
//         setTasksError("Failed to fetch tasks data");
//       }
//     };

//     fetchUserData();
//     fetchTasks();
//   }, [id]);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/tasks/user/${id}`
//       );
//       if (Array.isArray(response.data)) {
//         setTasks(response.data);
//       } else {
//         console.error("Tasks data is not an array:", response.data);
//         setTasksError("Tasks data is invalid");
//       }
//     } catch (error) {
//       console.error("Error fetching tasks data:", error);
//       setTasksError("Failed to fetch tasks data");
//     }
//   };

//   const filteredTasks = tasks.filter((task) => {
//     const today = new Date().toISOString().split("T")[0];
//     const sevenDaysLater = new Date();
//     sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

//     if (activeTab === "Recently") {
//       return (
//         new Date(task.completedAt) >
//         new Date(new Date().setDate(new Date().getDate() - 7))
//       );
//     } else if (activeTab === "Today") {
//       return task.dueDate === today;
//     } else if (activeTab === "Upcoming") {
//       return (
//         task.dueDate > today &&
//         task.dueDate <= sevenDaysLater.toISOString().split("T")[0]
//       );
//     } else if (activeTab === "Later") {
//       return task.dueDate > sevenDaysLater.toISOString().split("T")[0];
//     }
//     return true;
//   });

//   const handleAddTask = () => {
//     setSuccessMessage("Task added successfully");
//     // Fetch tasks again to update the task list
//     fetchTasks();
//     // Hide the message after 3 seconds
//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3000);
//   };

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };
//   const handleLogout = () => {
//     // Clear any user data, tokens, or authentication status
//     // For example, if you're using JWT, clear the token from localStorage
//     localStorage.removeItem("token");
//     // Navigate the user to the login page or any other appropriate page
//     navigate("/login");
//   };

//   return (
//     <div className="dashboard-container">
//       <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
//       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//       <div className={`content ${isOpen ? "content-shifted" : ""}`}>
//         <div className="content-header">
//           <div className="profile">
//             <div className="profile-info">
//               <h2 className="profile-name">
//                 Hello, {userData ? userData.username : "Loading...."}!
//               </h2>
//               <p>You have {tasks.length} tasks today</p>
//             </div>
//           </div>
//           <div className="profile-details">
//             <img
//               src="https://placehold.co/40x40"
//               alt="Profile"
//               className="profile-image"
//             />
//             <div className="profile-info">
//               <div className="profile-name-container">
//                 <h2 className="profile-name">
//                   {userData ? userData.username : "Loading...."}
//                 </h2>
//                 <FaAngleDown
//                   className="dropdown-icon"
//                   onClick={() => setShowContextMenu(!showContextMenu)}
//                 />
//               </div>
//               {userError && <p className="error">{userError}</p>}
//             </div>
//             {showContextMenu && (
//               <div className="context-menu">
//                 <button onClick={handleLogout}>Logout</button>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="tasks">
//           <h3 className="tasks-title">My tasks</h3>
//           <div className="task-options">
//             <span
//               className={`task-option ${
//                 activeTab === "Recently" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("Recently")}
//             >
//               Recently
//             </span>
//             <span
//               className={`task-option ${activeTab === "Today" ? "active" : ""}`}
//               onClick={() => setActiveTab("Today")}
//             >
//               Today
//             </span>
//             <span
//               className={`task-option ${
//                 activeTab === "Upcoming" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("Upcoming")}
//             >
//               Upcoming
//             </span>
//             <span
//               className={`task-option ${activeTab === "Later" ? "active" : ""}`}
//               onClick={() => setActiveTab("Later")}
//             >
//               Later
//             </span>
//           </div>
//           {tasksError ? (
//             <div className="error">{tasksError}</div>
//           ) : (
//             <div className="task-list">
//               {filteredTasks.length > 0 ? (
//                 filteredTasks.map((task) => (
//                   <div
//                     key={task._id}
//                     className={`task-item priority-${task.priority.toLowerCase()}`}
//                   >
//                     <h3 className="task-item-title">{task.title}</h3>
//                     <p className="task-description">{task.description}</p>
//                     <p className="task-due-date">
//                       Due Date: {new Date(task.dueDate).toLocaleDateString()}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <div className="no-tasks-message">
//                   <p>
//                     No tasks available for the selected filter. Try adding a
//                     task!
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//           <button
//             className="add-task-button"
//             onClick={() => setShowAddTaskModal(true)}
//           >
//             + Add Task
//           </button>
//         </div>
//         <div className="calendar">
//           <h3 className="calendar-title">Today</h3>
//           <div className="calendar-date">{new Date().toLocaleDateString()}</div>
//           <div className="calendar-tasks">
//             <Calendar
//               events={tasks.map((task) => ({
//                 title: task.title,
//                 date: new Date(task.dueDate),
//               }))}
//               // Other props for customization
//             />
//           </div>
//         </div>
//       </div>

//       {/* Add Task Modal */}
//       {showAddTaskModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowAddTaskModal(false)}>
//               &times;
//             </span>
//             <AddTaskPage
//               userId={id}
//               closeModal={() => setShowAddTaskModal(false)}
//               updateTasks={handleAddTask}
//             />
//           </div>
//         </div>
//       )}

//       {/* Display Success Message */}
//       {successMessage && (
//         <div className="success-message">
//           {successMessage}
//           <span className="close" onClick={() => setSuccessMessage("")}>
//             &times;
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Calendar from "react-calendar";
import { FaBars, FaAngleDown } from "react-icons/fa";
import AddTaskPage from "./AddTaskPage";

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Recently");
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [userError, setUserError] = useState("");
  const [tasksError, setTasksError] = useState("");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [sortOption, setSortOption] = useState("dueDate");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/auth/users/${id}`
        );
        if (response.data && response.data.user) {
          setUserData(response.data.user);
        } else {
          console.error("No user data found in the API response");
          setUserError("No user data found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserError("Failed to fetch user data");
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/tasks/user/${id}`
        );
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Tasks data is not an array:", response.data);
          setTasksError("Tasks data is invalid");
        }
      } catch (error) {
        console.error("Error fetching tasks data:", error);
        setTasksError("Failed to fetch tasks data");
      }
    };

    fetchUserData();
    fetchTasks();
  }, [id]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/tasks/user/${id}`
      );
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.error("Tasks data is not an array:", response.data);
        setTasksError("Tasks data is invalid");
      }
    } catch (error) {
      console.error("Error fetching tasks data:", error);
      setTasksError("Failed to fetch tasks data");
    }
  };

  const handleTaskCompletion = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}/complete`);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  const handleTaskDetails = (task) => {
    setTaskDetails(task);
  };

  const closeTaskDetailsModal = () => {
    setTaskDetails(null);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOption === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortOption === "priority") {
      return a.priority.localeCompare(b.priority);
    }
    return 0;
  });

  const filteredTasks = sortedTasks.filter((task) => {
    const today = new Date().toISOString().split("T")[0];
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    if (activeTab === "Recently") {
      return (
        new Date(task.completedAt) >
        new Date(new Date().setDate(new Date().getDate() - 7))
      );
    } else if (activeTab === "Today") {
      return task.dueDate === today;
    } else if (activeTab === "Upcoming") {
      return (
        task.dueDate > today &&
        task.dueDate <= sevenDaysLater.toISOString().split("T")[0]
      );
    } else if (activeTab === "Later") {
      return task.dueDate > sevenDaysLater.toISOString().split("T")[0];
    }
    return true;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddTask = () => {
    setSuccessMessage("Task added successfully");
    fetchTasks();
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isOpen ? "content-shifted" : ""}`}>
        <div className="content-header">
          <div className="profile">
            <div className="profile-info">
              <h2 className="profile-name">
                Hello, {userData ? userData.username : "Loading...."}!
              </h2>
              <p>You have {tasks.length} tasks today</p>
            </div>
          </div>
          <div className="profile-details">
            <img
              src="https://placehold.co/40x40"
              alt="Profile"
              className="profile-image"
            />
            <div className="profile-info">
              <div className="profile-name-container">
                <h2 className="profile-name">
                  {userData ? userData.username : "Loading...."}
                </h2>
                {/* Debugging: Add console.log to check state */}
                <FaAngleDown
                  className="dropdown-icon"
                  onClick={() => {
                    setShowContextMenu(!showContextMenu);
                    console.log(showContextMenu); // Add this line to check the state
                  }}
                />
              </div>
              {/* Debugging: Check if userError exists */}
              {userError && <p className="error">{userError}</p>}
            </div>
            {/* Debugging: Check if showContextMenu is true */}
            {showContextMenu && (
              <div className="context-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
        <div className="tasks">
          <h3 className="tasks-title">My tasks</h3>
          <div className="task-options">
            <span
              className={`task-option ${
                activeTab === "Recently" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Recently")}
            >
              Recently
            </span>
            <span
              className={`task-option ${activeTab === "Today" ? "active" : ""}`}
              onClick={() => setActiveTab("Today")}
            >
              Today
            </span>
            <span
              className={`task-option ${
                activeTab === "Upcoming" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Upcoming")}
            >
              Upcoming
            </span>
            <span
              className={`task-option ${activeTab === "Later" ? "active" : ""}`}
              onClick={() => setActiveTab("Later")}
            >
              Later
            </span>
          </div>
          <div className="task-sorting">
            <label>Sort by: </label>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          {tasksError ? (
            <div className="error">{tasksError}</div>
          ) : (
            <div className="task-list">
              {currentTasks.length > 0 ? (
                currentTasks.map((task) => (
                  <div
                    key={task._id}
                    className={`task-item priority-${task.priority.toLowerCase()}`}
                  >
                    <h3
                      className="task-item-title"
                      onClick={() => handleTaskDetails(task)}
                    >
                      {task.title}
                    </h3>
                    <p className="task-description">{task.description}</p>
                    <p className="task-due-date">
                      Due Date: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <div className="task-actions">
                      <label>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleTaskCompletion(task._id)}
                        />
                        Completed
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-tasks-message">
                  <p>
                    No tasks available for the selected filter. Try adding a
                    task!
                  </p>
                </div>
              )}
            </div>
          )}
          <button
            className="add-task-button"
            onClick={() => setShowAddTaskModal(true)}
          >
            + Add Task
          </button>
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(filteredTasks.length / tasksPerPage) },
              (_, index) => (
                <button key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
        <div className="calendar">
          <h3 className="calendar-title">Today</h3>
          <div className="calendar-date">{new Date().toLocaleDateString()}</div>
          <div className="calendar-tasks">
            <Calendar
              value={new Date()}
              tileContent={({ date }) => {
                const dayTasks = tasks.filter(
                  (task) =>
                    new Date(task.dueDate).toLocaleDateString() ===
                    date.toLocaleDateString()
                );
                return dayTasks.length > 0 ? (
                  <ul>
                    {dayTasks.map((task) => (
                      <li key={task._id}>{task.title}</li>
                    ))}
                  </ul>
                ) : null;
              }}
            />
          </div>
        </div>
      </div>
      {showAddTaskModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddTaskModal(false)}>
              &times;
            </span>
            <AddTaskPage
              userId={id}
              closeModal={() => setShowAddTaskModal(false)}
              updateTasks={handleAddTask}
            />
          </div>
        </div>
      )}
      {taskDetails && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeTaskDetailsModal}>
              &times;
            </span>
            <div className="task-details">
              <h2>{taskDetails.title}</h2>
              <p>{taskDetails.description}</p>
              <p>
                Due Date: {new Date(taskDetails.dueDate).toLocaleDateString()}
              </p>
              <p>Priority: {taskDetails.priority}</p>
              <p>Completed: {taskDetails.completed ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="success-message">
          {successMessage}
          <span className="close" onClick={() => setSuccessMessage("")}>
            &times;
          </span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

