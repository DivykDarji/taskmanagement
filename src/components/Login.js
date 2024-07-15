import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import HourglassLoader from "./HourglassLoader"; // Import the HourglassLoader component
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseApp from "../firebaseConfig"; // Adjust the path as per your file structure
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const showIcon = process.env.PUBLIC_URL + '/view.png';
const hideIcon = process.env.PUBLIC_URL + '/hide.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginStep, setLoginStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await axios.post("http://localhost:5000/auth/google-login", {
        email: user.email,
      });

      if (response.status === 200) {
        toast.success("Login successful");

        const userData = response.data.user;

        if (userData.isAdmin) {
          navigate(`/admin/dashboard/`);
        } else {
          navigate(`/dashboard/${userData._id}`);
        }

        const token = response.data.token;
        localStorage.setItem("token", token);
      } else {
        toast.error("Unexpected error. Please try again.");
      }
    } catch (error) {
      toast.error("Error logging in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        toast.error("Email does not exist. Please try again.");
      }
    } catch (error) {
      toast.error("Error checking email. Please try again.");
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
        toast.success("Login successful");

        const user = response.data.user;

        if (user.isAdmin) {
          navigate(`/admin/dashboard/`);
        } else {
          navigate(`/dashboard/${user._id}`);
        }

        const token = response.data.token;
        localStorage.setItem("token", token);
      } else {
        toast.error("Unexpected error. Please try again.");
      }
    } catch (error) {
      toast.error("Error logging in. Please try again.");
    } finally {
      setLoading(false);
    }

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.dismiss();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <img
              src={showPassword ? hideIcon : showIcon}
              alt="Toggle password visibility"
              className="password-toggle"
              onClick={toggleShowPassword}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? <HourglassLoader /> : "Log In"}
          </button>
        </form>
      )}
      {/* Sign in with Google section */}
      <div className="google-signin-section">
        <p>Or sign in with:</p>
        <button className="google-signin-button" onClick={handleGoogleSignIn} disabled={loading}>
          {loading ? <HourglassLoader /> : (
            <>
              <span>Sign in with Google</span>
              <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            </>
          )}
        </button>
      </div>
      <ToastContainer />
      <p className="forgot-password-link">
        Forgot your password? <Link to="/forgot-password">Click here</Link>
      </p>
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
