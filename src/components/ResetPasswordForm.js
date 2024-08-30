// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ResetPasswordForm.css";
// const showIcon = process.env.PUBLIC_URL + "/view.png";
// const hideIcon = process.env.PUBLIC_URL + "/hide.png";

// const ResetPasswordForm = ({ token }) => {
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [tokenError, setTokenError] = useState(null); // State to handle token errors

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `https://taskmangement-backend-v1o7.onrender.com/auth/reset-password/${token}`,
//         { password }
//       );

//       if (response.data.message === "Password has been reset") {
//         toast.success("Password reset successful.");
//       } else {
//         toast.error("Failed to reset password. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error resetting password:", error);

//       if (error.response && error.response.data.error) {
//         // Check if the error is due to an invalid or expired token
//         if (error.response.data.error === "Password reset token is invalid or has expired") {
//           setTokenError("The password reset link is invalid or has expired. Please request a new one.");
//         } else {
//           toast.error("Error resetting password. Please try again.");
//         }
//       } else {
//         toast.error("Error resetting password. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="reset-password-form">
//       <ToastContainer />
//       <h2>Reset Password</h2>
//       {tokenError ? (
//         <p className="error-message">{tokenError}</p> // Display error message if token is invalid or expired
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="password">New Password:</label>
//             <div className="password-reset-input">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="new-password"
//               />
//               <img
//                 src={showPassword ? hideIcon : showIcon}
//                 alt={showPassword ? "Hide Password" : "Show Password"}
//                 className="password-toggle"
//                 onClick={handleTogglePasswordVisibility}
//               />
//             </div>
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ResetPasswordForm;

import React, { useState, useEffect } from "react";
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
  const [tokenError, setTokenError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Validate token on page load
        await axios.get(`https://taskmangement-backend-v1o7.onrender.com/auth/validate-token/${token}`);
      } catch (error) {
        console.error("Token validation error:", error);
        if (error.response && error.response.data.error) {
          const errorMessage = error.response.data.error;
          setTokenError(errorMessage);

          // Trigger toast notification for token error
          toast.error(errorMessage);
        } else {
          const genericError = "Error validating token. Please try again.";
          setTokenError(genericError);
          toast.error(genericError);
        }
      }
    };

    verifyToken(); // Run token validation on page load
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://taskmangement-backend-v1o7.onrender.com/auth/reset-password/${token}`,
        { password }
      );

      if (response.data.message === "Password has been reset") {
        toast.success("Password reset successful.");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.response && error.response.data.error) {
        const errorMessage = error.response.data.error;
        setTokenError(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.error("Error resetting password. Please try again.");
      }
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
      {tokenError ? (
        <p className="error-message">{tokenError}</p> // Show error message if token is invalid or expired
      ) : (
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
      )}
    </div>
  );
};

export default ResetPasswordForm;



