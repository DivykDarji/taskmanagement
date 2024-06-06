// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes , useParams} from "react-router-dom";
import Banner from "./components/Banner";
import Box from "./components/Box";
import Signup from "./components/Signup";
import Header from "./components/Header";
import "./App.css";
import Contact from "./components/Contact";
import Learnmore from "./components/Learnmore";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ThankYouSignup from "./components/Thankyou";
import UserManagement from "./components/Usermanagement";
import UserEdit from './components/UserEdit';
import AddTaskPage from "./components/AddTaskPage";
import ProfilePage from "./components/ProfilePage"; // Import the ProfilePage component
import ForgotPassword from "./components/ForgotPassword";
import ResetPasswordForm from "./components/ResetPasswordForm"; // Import your ResetPasswordForm component


function App() {
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/reset-password/:token" render={(props) => <ResetPasswordForm token={props.match.params.token} />} /> */}
          <Route path="/reset-password/:token" element={<ResetPasswordRoute />} />
          <Route path="/dashboard/:id" element={<Dashboard />} /> 
          <Route path="/learnmore" element={<React.Fragment><Header /><Learnmore /></React.Fragment>} />
          <Route path="/thankyou-signup/:id" element={<ThankYouSignup />} />
          <Route path="/home" element={<Banner />} />
          <Route path="/admin/dashboard/:userId" element={<UserManagement />} /> {/* Updated route for UserManagement */}
          <Route path="/edit-user/:id" element={<UserEdit />} />
          <Route path={`/add-task/:id`} element={<AddTaskPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} /> 
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

