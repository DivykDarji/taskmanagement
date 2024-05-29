import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { FaBars, FaAngleDown } from "react-icons/fa";
import AddTaskPage from "./AddTaskPage";
import "./dashboard-calendar.css";

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
  const [tasksForToday, setTasksForToday] = useState([]); // Added tasksForToday state variable
 // eslint-disable-next-line
const [selectedDate, setSelectedDate] = useState(new Date());
  const tasksPerPage = 5;

  // Define fetchTasks function outside useEffect
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

  // Add another useEffect to update tasksForToday whenever tasks state changes
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayTasks = tasks.filter((task) => {
      const taskDueDate = new Date(task.dueDateTime)
        .toISOString()
        .split("T")[0];
      return taskDueDate === today;
    });
    setTasksForToday(todayTasks);
  }, [tasks]);

  // Handle task completion
  const handleTaskCompletion = async (taskId, userId) => {
    try {
      // Update task completion status in backend
      await axios.put(
        `http://localhost:5000/tasks/user/${userId}/${taskId}/complete`
      );
      fetchTasks(); // Refresh tasks after completing a task
      setActiveTab("Recently"); // Switch to "Recently" tab
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
    if (!a.dueDateTime) return -1; // Handle cases where dueDateTime is null or undefined
    if (!b.dueDateTime) return 1; // Handle cases where dueDateTime is null or undefined

    if (sortOption === "dueDate") {
      return new Date(a.dueDateTime) - new Date(b.dueDateTime); // Changed dueDate to dueDateTime
    } else if (sortOption === "priority") {
      return a.priority.localeCompare(b.priority);
    }
    return 0;
  });

  // Calculate the date seven days from now
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  // Calculate the last day of the current month
  const lastDayOfCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  // Helper function to parse and format dates
  const formatDate = (dateString) => {
    return new Date(dateString.split("T")[0]); // Extract date part and convert to Date object
  };

  // Filter tasks based on active tab
  const filteredTasks = sortedTasks.filter((task) => {
    // Get today's date in ISO format (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    // Extract task due date and completed date (if available) and format them
    const taskDueDate = formatDate(task.dueDateTime.split("T")[0]);
    const completedAtDate = task.completedAt
      ? formatDate(task.completedAt.split("T")[0])
      : null;

    // Switch statement to handle different tabs
    switch (activeTab) {
      case "Recently":
        // Display completed tasks within the last seven days in the "Recently" tab
        return task.completed && completedAtDate > sevenDaysFromNow;

      case "Today":
        // Display tasks due today and not completed in the "Today" tab
        return (
          taskDueDate.getTime() === new Date(today).getTime() && !task.completed
        );

      case "Upcoming":
        // Display tasks due in the future and within the next seven days in the "Upcoming" tab
        return taskDueDate > new Date(today) && taskDueDate <= sevenDaysFromNow;
      case "Later":
        // Display tasks due beyond the current month in the "Later" tab
        return taskDueDate > lastDayOfCurrentMonth && !task.completed;
      default:
        // For any other tab, return true (display all tasks)
        return true;
    }
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddTask = () => {
    setSuccessMessage("Task added successfully");
    fetchTasks(); // Refresh tasks after adding a new one
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

  // Toggle context menu visibility
  const toggleContextMenu = () => {
    setShowContextMenu(!showContextMenu);
    // console.log("Context menu visibility:", showContextMenu); // Debugging line
  };
  const handleEventClick = (clickedEvent) => {
    const clickedTask = tasks.find((task) => task.title === clickedEvent.title);
    if (clickedTask) {
      // Open a modal to show task details and provide edit and delete options
      setTaskDetails(clickedTask);
      setShowAddTaskModal(false); // Close the add task modal if open
    }
  };

  

  const getEventColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ff0000";
      case "medium":
        return "#ffa500";
      case "low":
        return "#008000";
      default:
        return "#000000";
    }
  };

  const handleEditTask = (task) => {
    // Set the task details for editing
    setTaskDetails(task);
    // Open the AddTaskPage modal
    setShowAddTaskModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Send a DELETE request to delete the task
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      // Fetch the updated tasks list
      fetchTasks();
      // Close the task details modal
      setTaskDetails(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
              <p>You have {tasksForToday.length} tasks today</p>
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
                  onClick={toggleContextMenu}
                />
              </div>
              {/* Debugging: Check if userError exists */}
              {userError && <p className="error">{userError}</p>}
            </div>
            {/* Debugging: Check if showContextMenu is true */}
            {showContextMenu && (
              <div className="context-menu active">
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
                      Due Date:{" "}
                      {new Date(task.dueDateTime).toLocaleDateString()}
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
        <div className="calendar-container">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={tasks.map((task) => ({
              title: task.title,
              start: task.dueDateTime,
              backgroundColor: getEventColor(task.priority),
              borderColor: "transparent",
            }))}
            eventClick={(eventInfo) => handleEventClick(eventInfo.event)}
            dateClick={(dateInfo) => setSelectedDate(dateInfo.date)}
            editable={true}
            selectable={true}
            select={(info) => {
              setSelectedDate(info.startStr);
              setShowAddTaskModal(true);
            }}
            eventDrop={(info) => {
              const updatedTask = {
                ...tasks.find((task) => task.title === info.event.title),
                dueDateTime: info.event.start,
              };
              // Update the task in the backend and state
              axios
                .put(
                  `http://localhost:5000/tasks/${updatedTask._id}`,
                  updatedTask
                )
                .then((response) => fetchTasks())
                .catch((error) =>
                  console.error("Error updating task date:", error)
                );
            }}
          />
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
              task={taskDetails} // Pass the task details for editing
              closeModal={() => setShowAddTaskModal(false)}
              updateTasks={handleAddTask}
            />
          </div>
        </div>
      )}
      {taskDetails && !showAddTaskModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeTaskDetailsModal}>
              &times;
            </span>
            <div className="task-details">
              <h2>{taskDetails.title}</h2>
              <p>{taskDetails.description}</p>
              <p>
                Due Date:{" "}
                {new Date(taskDetails.dueDateTime).toLocaleDateString()}
              </p>
              <p>Priority: {taskDetails.priority}</p>
              <p>Completed: {taskDetails.completed ? "Yes" : "No"}</p>
              {/* Add edit and delete buttons */}
              <div className="task-actions">
                <button onClick={() => handleEditTask(taskDetails)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(taskDetails._id)}>
                  Delete
                </button>
              </div>
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
