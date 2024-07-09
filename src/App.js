  import React, { useState, useEffect } from "react";
  import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
  import Banner from "./components/Banner";
  import Box from "./components/Box";
  import Signup from "./components/Signup";
  import Header from "./components/Header";
  import Contact from "./components/Contact";
  import Learnmore from "./components/Learnmore";
  import Login from "./components/Login";
  import Dashboard from "./components/Dashboard";
  import ThankYouSignup from "./components/Thankyou";
  import UserManagement from "./components/Usermanagement";
  import UserEdit from './components/UserEdit';
  import AddTaskPage from "./components/AddTaskPage";
  import ProfilePage from "./components/ProfilePage";
  import ForgotPassword from "./components/ForgotPassword";
  import ResetPasswordForm from "./components/ResetPasswordForm";
  import TaskManagement from "./components/TaskManagement";
  import AdminDashboard from "./components/AdminDashboard";

  function App() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    // Example function to check if user is admin
    const checkAdminStatus = () => {
      // Implementing logic to determine if user is an admin
      
      return isAdmin;
    };

    // Simulate fetching admin status on component mount
    useEffect(() => {
      // Example: Fetch admin status from backend or set based on some condition
      const token = localStorage.getItem('token');
      if (token) {
        setIsAdmin(true); // Set to true for demo, replace with actual logic
      } else {
        setIsAdmin(false);
      }
      setLoading(false); // Set loading state to false after checking admin status
    }, []);

    // Protected route component to handle admin route protection
    const AdminRoute = ({ element, ...rest }) => {
      if (loading) return <div>Loading...</div>; // Handle loading state
      return checkAdminStatus() ? element : <Navigate to="/login" />;
    };

    return (
      <Router>
        <div className="wrapper">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/learnmore" element={<React.Fragment><Header /><Learnmore /></React.Fragment>} />
            <Route path="/thankyou-signup/:id" element={<ThankYouSignup />} />
            <Route path="/home" element={<Banner />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/add-task/:id" element={<AddTaskPage />} />

            {/* Protected admin routes */}
            <Route path="/admin/dashboard/" element={<AdminRoute element={<AdminDashboard />} />} />
            <Route path="/admin/user-management" element={<AdminRoute element={<UserManagement />} />} />
            <Route path="/admin/task-management" element={<AdminRoute element={<TaskManagement />} />} />
            <Route path="/edit-user/:id" element={<AdminRoute element={<UserEdit />} />} />

            {/* Default route */}
            <Route path="/" element={<Banner />} />
          </Routes>
          <Box />
        </div>
      </Router>
    );
  }

  export default App;
