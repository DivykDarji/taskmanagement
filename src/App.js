

// src/App.js
import React, { useContext, useEffect , useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate , useParams} from 'react-router-dom';
import Banner from './components/Banner';
import Box from './components/Box';
import Signup from './components/Signup';
import Header from './components/Header';
import Contact from './components/Contact';
import Learnmore from './components/Learnmore';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ThankYouSignup from './components/Thankyou';
import UserManagement from './components/Usermanagement';
import UserEdit from './components/UserEdit';
import AddTaskPage from './components/AddTaskPage';
import ProfilePage from './components/ProfilePage';
import ForgotPassword from './components/ForgotPassword';
import ResetPasswordForm from './components/ResetPasswordForm';
import TaskManagement from './components/TaskManagement';
import AdminDashboard from './components/AdminDashboard';
import HourglassLoader from './components/HourglassLoader';
import { LoadingContext } from './LoadingContext'; // Import LoadingContext

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { loading } = useContext(LoadingContext); // Use loading context

  // Example function to check if user is admin
  const checkAdminStatus = () => {
    return isAdmin;
  };

  // Simulate fetching admin status on component mount
  useEffect(() => {
    setIsAdmin(true); // Set to true for demo, replace with actual logic
  }, []);

  // Protected route component to handle admin route protection
  const AdminRoute = ({ element, ...rest }) => {
    return checkAdminStatus() ? element : <Navigate to="/login" />;
  };
   

  return (
    <Router>
      <div className="wrapper">
        {loading && <HourglassLoader />} {/* Show loader if loading */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPasswordRoute />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/learnmore" element={<React.Fragment><Header /><Learnmore /></React.Fragment>} />
          <Route path="/thankyou-signup/:id" element={<ThankYouSignup />} />
          <Route path="/home" element={<Banner />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/add-task/:id" element={<AddTaskPage />} />

          {/* Protected admin routes */}
          <Route path="/admin/dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
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

// Create a separate component to handle the reset password route
const ResetPasswordRoute = ({ match }) => {
  const { token } = useParams();
  return <ResetPasswordForm token={token} />;
};

export default App;



