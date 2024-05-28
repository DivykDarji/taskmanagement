// import React, { useState, useEffect } from "react";
// import "./Login.css";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [loginStep, setLoginStep] = useState(1); // Step 1: Enter Email, Step 2: Enter Password
//   const [loginResult, setLoginResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       // Check if the email exists in the database
//       const response = await axios.post(
//         "http://localhost:5000/auth/check-email",
//         {
//           email: formData.email,
//         }
//       );

//       if (response.data.exists) {
//         // Move to Step 2 if the email exists
//         setLoginStep(2);
//       } else {
//         // Update state with the error message
//         setLoginResult({
//           message: "Email does not exist. Please try again.",
//           type: "error",
//         });
//       }
//     } catch (error) {
//       // Update state with the error message
//       setLoginResult({
//         message: "Error checking email. Please try again.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       // Authenticate the user by checking the email and password
//       const response = await axios.post(
//         "http://localhost:5000/auth/login",
//         formData  
//       );

//       if (response.status === 200) {
//         setLoginResult({ message: "Login successful", type: "success" });
//         console.log("Response data:", response.data);
//         const token = response.data.token;
//         console.log("Token:", token);
//         localStorage.setItem("token", token);

//         // Delay the navigation after showing the message
//         setTimeout(() => {
//           navigate(`/dashboard/${response.data.user._id}`);
//         }, 2000);
//       } else {
//         setLoginResult({
//           message: "Unexpected error. Please try again.",
//           type: "error",
//         });
//       }
//     } catch (error) {
//       // Handle errors
//     } finally {
//       setLoading(false);
//     }

//     setFormData({
//       email: "",
//       password: "",
//     });

//     // Reset to Step 1 after login attempt
//     setLoginStep(1);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoginResult(null);
//     }, 5000);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [loginResult]);

//   const handleClose = () => {
//     setLoginResult(null);
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {loginStep === 1 ? (
//         <form onSubmit={handleEmailSubmit}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit">Next</button>
//         </form>
//       ) : (
//         <form onSubmit={handleLogin}>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Logging ..." : "Log In"}
//           </button>
//         </form>
//       )}

//       {/* Display login result message */}
//       {loginResult && (
//         <div
//           className={`message ${
//             loginResult.type === "success" ? "success" : "error"
//           }`}
//         >
//           <p3>{loginResult.message}</p3>{" "}
//           <button1 className="close-button" onClick={handleClose}>
//             &#x2716;
//           </button1>
//         </div>
//       )}
//       <p className="signup-link">
//         Don't have an account? <Link to="/signup">Sign up</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginStep, setLoginStep] = useState(1);
  const [loginResult, setLoginResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/auth/check-email",
        {
          email: formData.email,
        }
      );

      if (response.data.exists) {
        setLoginStep(2);
      } else {
        setLoginResult({
          message: "Email does not exist. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setLoginResult({
        message: "Error checking email. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );
  
      if (response.status === 200) {
        setLoginResult({ message: "Login successful", type: "success" });
  
        const user = response.data.user;
  
        // Check if the user is an admin
        if (user.isAdmin) {
          // Redirect to admin dashboard
          navigate(`/admin/dashboard/${user._id}`);
        } else {
          // Redirect to user dashboard
          navigate(`/dashboard/${user._id}`);
        }
  
        // Store token in local storage
        const token = response.data.token;
        localStorage.setItem("token", token);
      } else {
        setLoginResult({
          message: "Unexpected error. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      // Handle errors
      setLoginResult({
        message: "Error logging in. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  
    // Reset form data and login step
    setFormData({
      email: "",
      password: "",
    });
    setLoginStep(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoginResult(null);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [loginResult]);

  const handleClose = () => {
    setLoginResult(null);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {loginStep === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit">Next</button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging ..." : "Log In"}
          </button>
        </form>
      )}
      {loginResult && (
        <div
          className={`message ${
            loginResult.type === "success" ? "success" : "error"
          }`}
        >
          <p3>{loginResult.message}</p3>{" "}
          <button1 className="close-button" onClick={handleClose}>
            &#x2716;
          </button1>
        </div>
      )}
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
