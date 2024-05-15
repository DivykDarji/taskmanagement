import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Signup.css';
const { getAuth } = require('firebase/auth'); // Use require syntax for CommonJS modules
const firebaseApp = require('../firebaseConfig'); // Use require syntax for CommonJS modules
const { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } = require('firebase/auth'); // Use require syntax for CommonJS modules

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
  });
  const [signupResult, setSignupResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSignupWithGoogle ] = useState(false);

  const auth = getAuth(firebaseApp);

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      setLoading(true);
      if (isSignupWithGoogle) {
        // Sign up with Google using Firebase Authentication
         await handleSignupWithGoogle();
      } else {
        // Traditional signup
         await handleTraditionalSignup();
      }
      // Handle response accordingly
    } catch (error) {
      // Handle error
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

    // Validate email and phone number in real-time
    if (name === 'email') {
      if (!isValidEmail(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        checkEmailExists(value);
      }
    } else if (name === 'phonenumber') {
      if (!isValidPhoneNumber(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, phonenumber: 'Invalid phone number format' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phonenumber: '' }));
      }
    }
  };

  const handleSignupWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);

      // Redirect to thank you page upon successful authentication
      if (response.user) {
        navigate(`/thankyou-signup/${response.user.uid}`);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setSignupResult({ message: 'Error signing in with Google. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleTraditionalSignup = async () => {
  try {
    setLoading(true);
    const { email, password, username, phonenumber } = formData;
    const response = await createUserWithEmailAndPassword(auth, email, password);
    await axios.post('http://localhost:5000/auth/signup', {
      email,
      username,
      phonenumber,
      password, // Include password in the request
      authMethod: 'traditional', // Add authMethod field to specify traditional authentication
    });
    // Check the response from createUserWithEmailAndPassword
    if (response.user) {
      // Handle successful signup
      setSignupResult({ message: 'Signup successful', type: 'success' });
      setTimeout(() => {
        navigate(`/thankyou-signup/${response.user.uid}?name=${encodeURIComponent(username)}`);
      }, 2000);
    }
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/check-email', { email });
      if (response.data.exists) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already exists. Please log in.' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.username) {
      errors.username = 'Username is required';
    }

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.phonenumber) {
      errors.phonenumber = 'Phone number is required';
    } else if (!isValidPhoneNumber(data.phonenumber)) {
      errors.phonenumber = 'Invalid phone number format';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        {errors.username && <span className="error-message">{errors.username}</span>}

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <label htmlFor="phonenumber">Phonenumber:</label>
        <input
          type="text"
          id="phonenumber"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          required
        />
        {errors.phonenumber && <span className="error-message">{errors.phonenumber}</span>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span className="error-message">{errors.password}</span>}

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <div className="sign-in-with-google" onClick={handleSignupWithGoogle}>
        <span>Continue with:  </span>
        <FontAwesomeIcon icon={faGoogle} className="google-icon" />
      </div>

      {/* Signup result message */}
      {signupResult && (
        <div className={`message ${signupResult.type === 'success' ? 'success-message' : 'error-message'}`}>
          <p>{signupResult.message}</p>
        </div>
      )}

      {/* Your existing login link */}
      <p className="login-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
