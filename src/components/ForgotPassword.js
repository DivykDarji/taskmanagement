import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./ForgotPassword.css"; // Create a CSS file for styling if needed

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`https://taskmangement-backend-v1o7.onrender.com/auth/forgot-password`, { email });

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error sending password reset link:", error); // Log error
      toast.error("Error sending password reset link. Please try again."); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      <p className="login-link">
        Remembered your password? <Link to="/login">Log in</Link>
      </p>
      <ToastContainer
      />
    </div>
  );
};

export default ForgotPassword;

