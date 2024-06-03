//   // import React, { useState, useEffect, useCallback } from 'react';
//   // import axios from 'axios';
//   // import './UserManagement.css';
//   // import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
//   // import { FaAngleDown } from 'react-icons/fa'; // Import FaAngleDown
//   // const searchIconUrl = '/search.png';

//   // const UserManagement = () => {
//   //   const [users, setUsers] = useState([]);
//   //   const [currentPage, setCurrentPage] = useState(1);
//   //   const [totalPages, setTotalPages] = useState(1);
//   //   const [searchQuery, setSearchQuery] = useState('');
//   //   const [showSearch, setShowSearch] = useState(false);
//   //   const [showContextMenu, setShowContextMenu] = useState(false); // Add state for context menu
//   // const navigate = useNavigate(); // Initialize useNavigate hook

//   //   const handleSearch = (event) => {
//   //     const query = event.target.value;
//   //     setSearchQuery(query);
//   //     setCurrentPage(1); // Reset currentPage when the search query changes

//   //     // Fetch users with the updated search query
//   //     fetchUsers(query);
//   //   };

//   //   // Update the fetchUsers function to accept a search query parameter
//   // const fetchUsers = useCallback(async (searchQuery) => {
//   //   try {
//   //     console.log('Fetching users with search query:', searchQuery);
//   //     const response = await axios.get(`http://localhost:5000/auth/users`, {
//   //       params: {
//   //         page: currentPage,
//   //         search: searchQuery,
//   //       },
//   //     });
//   //     console.log('Response from backend:', response.data);

//   //     // Check if only one user is returned and update state accordingly
//   //     if (response.data.users.length === 1) {
//   //       setUsers([response.data.users[0]]);
//   //       setTotalPages(1);
//   //     } else {
//   //       setUsers(response.data.users);
//   //       setTotalPages(response.data.totalPages);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching users:', error);
//   //   }
//   // }, [currentPage]);
//   //   useEffect(() => {
//   //     fetchUsers();
//   //   }, [fetchUsers]);

//   //   const handleDelete = async (userId) => {
//   //     try {
//   //       await axios.delete(`http://localhost:5000/auth/users/${userId}`);
//   //       setUsers(users.filter(user => user._id !== userId));
//   //     } catch (error) {
//   //       console.error('Error deleting user:', error);
//   //     }
//   //   };

//   //   const handleNextPage = () => {
//   //     setCurrentPage(currentPage + 1);
//   //   };

//   //   const handlePrevPage = () => {
//   //     setCurrentPage(currentPage - 1);
//   //   };

//   //   const toggleSearchBox = () => {
//   //     setShowSearch(!showSearch); // Toggle the state to show or hide the search box
//   //   };

//   //   const handleLogout = () => {
//   //     localStorage.removeItem("token");
//   //     navigate("/login");
//   //   };
//   //   const toggleContextMenu = () => {
//   //     setShowContextMenu(!showContextMenu);
//   //   };

//   //   return (

//   //     <div className="container">
//   //     <div className="content-header">
//   //       <div className="profile">
//   //         <div className="profile-info">
//   //           <h2 className="profile-name">
//   //             Hello, Admin!
//   //           </h2>
//   //         </div>
//   //       </div>
//   //       <div className="profile-details">
//   //         <img
//   //           src="https://placehold.co/40x40"
//   //           alt="Profile"
//   //           className="profile-image"
//   //         />
//   //         <div className="profile-info">
//   //           <div className="profile-name-container">
//   //             <h2 className="profile-name">
//   //               Admin
//   //             </h2>
//   //             <FaAngleDown
//   //               className="dropdown-icon"
//   //               onClick={toggleContextMenu}
//   //             />
//   //           </div>
//   //         </div>
//   //         {showContextMenu && (
//   //           <div className="context-menu active">
//   //             <button onClick={handleLogout}>Logout</button>
//   //           </div>
//   //         )}
//   //       </div>
//   //     </div>
//   //     <h1>User Management</h1>
//   //     <div className={`search-section ${showSearch ? 'show-search' : ''}`}>
//   //       <div className="search-container">
//   //         <input
//   //           type="text"
//   //           placeholder="Search by username or email address..."
//   //           value={searchQuery}
//   //           onChange={handleSearch}
//   //           className="search-input"
//   //         />
//   //         <img src={searchIconUrl} alt="Search" onClick={toggleSearchBox} className="search-icon" />
//   //       </div>
//   //     </div>
//   //       <div className="user-list">
//   //         {users.map(user => (
//   //           <div className="user-card" key={user._id}>
//   //             <h3>{user.username}</h3>
//   //             <p>Email: {user.email}</p>
//   //             <p>Phone Number: {user.phonenumber}</p>
//   //             <div className="button-container">
//   //               <button className="button edit-button"><Link to={`/edit-user/${user._id}`}>Edit</Link></button>
//   //               <button className="button delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
//   //             </div>
//   //           </div>
//   //         ))}
//   //       </div>
//   //       <div className="pagination">
//   //         <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
//   //         <span>{currentPage} / {totalPages}</span>
//   //         <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   // export default UserManagement;

//   import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import './UserManagement.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaAngleDown } from 'react-icons/fa';
// const searchIconUrl = '/search.png';

// const UserManagement = () => {
//     const [users, setUsers] = useState([]);
//     const [tasks, setTasks] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showSearch, setShowSearch] = useState(false);
//     const [showContextMenu, setShowContextMenu] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const navigate = useNavigate();

//     const handleSearch = (event) => {
//         const query = event.target.value;
//         setSearchQuery(query);
//         setCurrentPage(1);
//         fetchUsers(query);
//     };

//     const fetchUsers = useCallback(async (searchQuery) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/auth/users`, {
//                 params: {
//                     page: currentPage,
//                     search: searchQuery,
//                 },
//             });

//             if (response.data.users.length === 1) {
//                 setUsers([response.data.users[0]]);
//                 setTotalPages(1);
//             } else {
//                 setUsers(response.data.users);
//                 setTotalPages(response.data.totalPages);
//             }
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     }, [currentPage]);

//     const fetchTasks = useCallback(async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/tasks`);
//             setTasks(response.data.tasks);
//         } catch (error) {
//             console.error('Error fetching tasks:', error);
//         }
//     }, []);

//     useEffect(() => {
//         fetchUsers();
//         fetchTasks();
//     }, [fetchUsers, fetchTasks]);

//     const handleDeleteUser = async (userId) => {
//         try {
//             await axios.delete(`http://localhost:5000/auth/users/${userId}`);
//             setUsers(users.filter(user => user._id !== userId));
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const handleDeleteTask = async (taskId) => {
//         try {
//             await axios.delete(`http://localhost:5000/tasks/${taskId}`);
//             setTasks(tasks.filter(task => task._id !== taskId));
//         } catch (error) {
//             console.error('Error deleting task:', error);
//         }
//     };

//     const handleNextPage = () => {
//         setCurrentPage(currentPage + 1);
//     };

//     const handlePrevPage = () => {
//         setCurrentPage(currentPage - 1);
//     };

//     const toggleSearchBox = () => {
//         setShowSearch(!showSearch);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     const toggleContextMenu = () => {
//         setShowContextMenu(!showContextMenu);
//     };

//     const handleUserClick = (user) => {
//         setSelectedUser(user);
//     };

//     return (
//         <div className="container">
//             <div className="content-header">
//                 <div className="profile">
//                     <div className="profile-info">
//                         <h2 className="profile-name">
//                             Hello, Admin!
//                         </h2>
//                     </div>
//                 </div>
//                 <div className="profile-details">
//                     <img
//                         src="https://placehold.co/40x40"
//                         alt="Profile"
//                         className="profile-image"
//                     />
//                     <div className="profile-info">
//                         <div className="profile-name-container">
//                             <h2 className="profile-name">
//                                 Admin
//                             </h2>
//                             <FaAngleDown
//                                 className="dropdown-icon"
//                                 onClick={toggleContextMenu}
//                             />
//                         </div>
//                     </div>
//                     {showContextMenu && (
//                         <div className="context-menu active">
//                             <button onClick={handleLogout}>Logout</button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <h1>User & Task Management</h1>
//             <div className={`search-section ${showSearch ? 'show-search' : ''}`}>
//                 <div className="search-container">
//                     <input
//                         type="text"
//                         placeholder="Search by username or email address..."
//                         value={searchQuery}
//                         onChange={handleSearch}
//                         className="search-input"
//                     />
//                     <img src={searchIconUrl} alt="Search" onClick={toggleSearchBox} className="search-icon" />
//                 </div>
//             </div>
//             <div className="section">
//                 <h2>Users</h2>
//                 <div className="user-list">
//                     {users.map(user => (
//                         <div className={`user-card ${selectedUser && selectedUser._id === user._id ? 'selected' : ''}`} key={user._id} onClick={() => handleUserClick(user)}>
//                             <h3>{user.username}</h3>
//                             <p>Email: {user.email}</p>
//                             <p>Phone Number: {user.phonenumber}</p>
//                             <div className="button-container">
//                                 <button className="button edit-button">
//                                     <Link to={`/edit-user/${user._id}`}>Edit</Link>
//                                 </button>
//                                 <button className="button delete-button" onClick={() => handleDeleteUser(user._id)}>
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {selectedUser && (
//                 <div className="section">
//                     <h2>Tasks for {selectedUser.username}</h2>
//                     <div className="task-list">
//                         {tasks.filter(task =>  task.createdBy === selectedUser._id).map(task => (
//                             <div className="task-card" key={task._id}>
//                                 <h3>{task.title}</h3>
//                                 <p>Description: {task.description}</p>
//                                 <p>Due Date: {task.dueDateTime}</p>
//                                 <div className="button-container">
//                                     <button className="button edit-button">
//                                         <Link to={`/edit-task/${task._id}`}>Edit</Link>
//                                     </button>
//                                     <button className="button delete-button" onClick={() => handleDeleteTask(task._id)}>
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//             <div className="pagination">
//                 <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
//                 <span>{currentPage} / {totalPages}</span>
//                 <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
//             </div>
//         </div>
//     );
// };

// export default UserManagement;

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./UserManagement.css";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
const searchIconUrl = "/search.png";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
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
        const response = await axios.get(`http://localhost:5000/auth/users`, {
          params: {
            page: currentPage,
            search: searchQuery,
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

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, [fetchUsers, fetchTasks]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/auth/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
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

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setShowTaskPopup(true);
  };

  return (
    <div className="container">
      <div className="content-header">
        <div className="profile">
          <div className="profile-info">
            <h2 className="profile-name">Hello, Admin!</h2>
          </div>
        </div>
        <div className="profile-details">
          {/* <img
            src="https://placehold.co/40x40"
            alt="Profile"
            className="profile-image"
          /> */}
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
      <h1>User & Task Management</h1>
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
            <div
              className="user-card"
              key={user._id}
              onClick={() => handleUserClick(user)}
            >
              <h3>{user.username}</h3>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phonenumber}</p>
              <div className="button-container">
                <button className="button edit-button">
                  <Link to={`/edit-user/${user._id}`}>Edit</Link>
                </button>
                <button
                  className="button delete-button"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showTaskPopup && selectedUser && (
        <div className="task-popup">
          <h2>Tasks for {selectedUser.username}</h2>
          <div className="task-list">
            {tasks
              .filter((task) => task.createdBy === selectedUser._id)
              .map((task) => (
                <div className="task-card" key={task._id}>
                  <h3>{task.title}</h3>
                  <p>Description: {task.description}</p>
                  <p>Due Date: {task.dueDateTime}</p>
                  <div className="button-container">
                    <button className="button edit-button">
                      <Link to={`/edit-task/${task._id}`}>Edit</Link>
                    </button>
                    <button
                      className="button delete-button"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <button onClick={() => setShowTaskPopup(false)}>Close</button>
        </div>
      )}
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
  );
};

export default UserManagement;
