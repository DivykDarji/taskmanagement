import React, { useState, useEffect } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log('Sending signup request with data:', formData);
      const response = await axios.post('http://localhost:5000/auth/signup', formData);

      console.log('Response from server:', response.data);

      if (response.status === 201) {
        console.log('Signup successful');
        setSignupResult({ message: 'Signup successful', type: 'success' });
        localStorage.setItem('username', formData.username);

        // Delay the navigation after showing the message
        setTimeout(() => {
          navigate(`/thankyou-signup/${formData.username}`);
        }, 2000);
      } else {
        console.error('Unexpected response status:', response.status);
        setSignupResult({ message: 'Unexpected error. Please try again.', type: 'error' });
      }
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false);
    }

    setFormData({
      username: '',
      email: '',
      phonenumber: '',
      password: '',
    });
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
      setSignupResult(null);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [signupResult]);



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

        <label htmlFor="phonenumber">Phonenumber:</label>
        <input
          type="text"
          id="phonenumber"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          required
        />

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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {/* Display signup result message */}
      {signupResult && (
        <div className={`message ${signupResult.type === 'success' ? 'success-message' : 'error-message'}`}>
          <p3>{signupResult.message}</p3> <button1 className="close-button"  onClick={() => setSignupResult(null)}>
            &#x2716; {/* Unicode character for the cross sign */}
          </button1>
        </div>
      )}
    </div>
  );
};

export default Signup;
