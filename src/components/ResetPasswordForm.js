

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPasswordForm.css";
const showIcon = process.env.PUBLIC_URL + "/view.png";
const hideIcon = process.env.PUBLIC_URL + "/hide.png";

const ResetPasswordForm = ({ token }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/auth/reset-password/${token}`,
        { password }
      );

      if (response.data.message === "Password has been reset") {
        toast.success("Password reset successful.");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="reset-password-form">
      <ToastContainer />
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <div className="password-reset-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <img
              src={showPassword ? hideIcon : showIcon}
              alt={showPassword ? "Hide Password" : "Show Password"}
              className="password-toggle"
              onClick={handleTogglePasswordVisibility}
            />
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
