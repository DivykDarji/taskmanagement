
  import React, { useState } from "react";
  import { useNavigate, Link } from "react-router-dom";
  import axios from "axios";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faGoogle } from "@fortawesome/free-brands-svg-icons";
  import "./Signup.css";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import HourglassLoader from "./HourglassLoader"; // Adjust the path as per your file structure

  const showIcon = process.env.PUBLIC_URL + "/view.png";
  const hideIcon = process.env.PUBLIC_URL + "/hide.png";

  const { getAuth } = require("firebase/auth");
  const firebaseApp = require("../firebaseConfig");
  const {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
  } = require("firebase/auth");

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSignupWithGoogle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const auth = getAuth(firebaseApp);

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      for (const key in validationErrors) {
        toast.error(validationErrors[key]);
      }
      return;
    }

    try {
      setLoading(true);
      if (isSignupWithGoogle) {
        await handleSignupWithGoogle();
      } else {
        await handleTraditionalSignup();
      }
    } catch (error) {
      toast.error("Error during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      if (!isValidEmail(value)) {
        if (!errors.email) {
          toast.error("Invalid email format");
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email format",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        checkEmailExists(value);
      }
    } else if (name === "phonenumber") {
      if (!isValidPhoneNumber(value)) {
        if (!errors.phonenumber) {
          toast.error("Invalid phone number format");
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          phonenumber: "Invalid phone number format",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phonenumber: "" }));
      }
    } else if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 1:
      case 2:
        return "Weak";
      case 3:
        return "Moderate";
      case 4:
        return "Strong";
      case 5:
        return "Very Strong";
      default:
        return "";
    }
  };

  const handleSignupWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);

      if (response.user) {
        toast.success("Signup successful");
        navigate(`/thankyou-signup/${response.user.uid}`);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Error signing in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTraditionalSignup = async () => {
    try {
      setLoading(true);
      const { email, password, username, phonenumber } = formData;
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await axios.post("https://taskmangement-backend-v1o7.onrender.com/auth/signup", {
        email,
        username,
        phonenumber,
        password,
        authMethod: "traditional",
      });

      await axios.post("https://taskmangement-backend-v1o7.onrender.com/auth/send-email", {
        email,
        name: username,
      });

      if (response.user) {
        toast.success("Signup successful");
        setTimeout(() => {
          navigate(
            `/thankyou-signup/${response.user.uid}?name=${encodeURIComponent(
              username
            )}`
          );
        }, 2000);
      }
    } catch (error) {
      console.error("Error during traditional signup:", error);
      toast.error("Error during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(
        "https://taskmangement-backend-v1o7.onrender.com/auth/check-email",
        { email }
      );
      if (response.data.exists) {
        toast.error("Email already exists");
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already exists",
        }));
      }
    } catch (error) {
      console.error("Error checking email existence:", error);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.username.trim()) {
      errors.username = "Username is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.phonenumber.trim()) {
      errors.phonenumber = "Phone number is required";
    } else if (!isValidPhoneNumber(data.phonenumber)) {
      errors.phonenumber = "Invalid phone number format";
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhoneNumber = (phonenumber) => {
    return /^\d{10}$/.test(phonenumber);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phonenumber">Phone Number:</label>
        <input
          type="tel"
          id="phonenumber"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="password-toggle-icon"
          >
            <img
              src={showPassword ? hideIcon : showIcon}
              alt="Toggle password visibility"
            />
          </span>
        </div>

        {formData.password && (
          <div className="password-strength-bar-container">
            <div
              className={`password-strength-bar ${passwordStrength
                .toLowerCase()
                .replace(" ", "-")}`}
            ></div>
            <div className="password-strength-text">{passwordStrength}</div>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? <HourglassLoader /> : "Sign Up"}
        </button>
        <div className="sign-in-with-google" onClick={handleSignupWithGoogle}>
          <span>Sign in with Google</span>
          <FontAwesomeIcon icon={faGoogle} className="google-icon" />
        </div>
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
