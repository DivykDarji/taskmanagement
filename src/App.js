// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:id" element={<Dashboard />} /> 
          <Route path="/learnmore" element={<React.Fragment><Header /><Learnmore /></React.Fragment>} />
          <Route path="/thankyou-signup/:id" element={<ThankYouSignup />} />
          <Route path="/home" element={<Banner />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/edit-user/:id" element={<UserEdit />} />
          <Route path="/" element={<Banner />} />
        </Routes>
        <Box />
      </div>
    </Router>
  );
}

export default App;

