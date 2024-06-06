

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./PasswordChangeForm.css";
const showIcon = process.env.PUBLIC_URL + '/view.png';
const hideIcon = process.env.PUBLIC_URL + '/hide.png';
const PasswordChangeForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      // Update password
      await axios.put(`http://localhost:5000/auth/users/${userId}/password`, {
        currentPassword,
        newPassword,
      });

      toast.success("Password changed successfully.");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect current password.");
      } else {
        toast.error("Error changing password.");
      }
      console.error("Error changing password:", error);
    }
  };

  const toggleShowPassword = (passwordType) => {
    switch (passwordType) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Current Password:</label>
    <div className="password-input">
      <input
        type={showCurrentPassword ? "text" : "password"}
        name="currentPassword"
        value={formData.currentPassword}
        onChange={handleChange}
        required
      />
      <img
        src={showCurrentPassword ? hideIcon : showIcon}
        alt="Toggle current password visibility"
        className="password-toggle"
        onClick={() => toggleShowPassword("current")}
      />
    </div>
  </div>
  <div className="form-group">
    <label>New Password:</label>
    <div className="password-input">
      <input
        type={showNewPassword ? "text" : "password"}
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        required
      />
      <img
        src={showNewPassword ? hideIcon : showIcon}
        alt="Toggle new password visibility"
        className="password-toggle"
        onClick={() => toggleShowPassword("new")}
      />
    </div>
  </div>
  <div className="form-group">
    <label>Confirm New Password:</label>
    <div className="password-input">
      <input
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <img
        src={showConfirmPassword ? hideIcon : showIcon}
        alt="Toggle confirm password visibility"
        className="password-toggle"
        onClick={() => toggleShowPassword("confirm")}
      />
    </div>
  </div>
  <button className="submit-button" type="submit">Change Password</button>
</form>
  );
};

export default PasswordChangeForm;
