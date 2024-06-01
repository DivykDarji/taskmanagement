// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./ProfilePage.css"; // Import CSS file for styling
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     phonenumber: "",
//     profileImage: "",
//   });
//   const [newProfileImage, setNewProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null); // New state for image preview
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch user data from backend based on the user ID
//     axios
//       .get(`http://localhost:5000/auth/users/${id}`)
//       .then((response) => {
//         setUser(response.data.user);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [id]);

//   useEffect(() => {
//     // Update image preview when a new profile image is selected
//     if (newProfileImage) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(newProfileImage);
//     } else {
//       setImagePreview(null);
//     }
//   }, [newProfileImage]);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setNewProfileImage(file);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("username", user.username);
//     formData.append("email", user.email);
//     formData.append("phonenumber", user.phonenumber);
//     if (newProfileImage) {
//       formData.append("profileImage", newProfileImage);
//     }

//     try {
//       await axios.put(`http://localhost:5000/auth/users/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setSuccessMessage("User data updated successfully");
//       setErrorMessage("");

//       // Delay navigation to the dashboard to ensure success message is displayed
//       setTimeout(() => {
//         navigate(`/dashboard/${user._id}`);
//       }, 1000); // 1000 milliseconds delay
//     } catch (error) {
//       setSuccessMessage("");
//       setErrorMessage("Error updating user data");
//       console.error("Error updating user data:", error);
//     }
//   };

//   return (
//     <div className="profile-container">
//       <h2>Profile Page</h2>
//       {successMessage && (
//         <div className="success-message">{successMessage}</div>
//       )}
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       <div className="form-group">
//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           value={user.username}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={user.email}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label>Phone Number:</label>
//         <input
//           type="text"
//           name="phonenumber"
//           value={user.phonenumber}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label>Profile Image:</label>
//         {imagePreview && (
//           <img src={imagePreview} alt="Profile" className="profile-image" />
//         )}
//         {!imagePreview && user.profileImage && (
//           <img
//             src={`http://localhost:5000/uploads/profileImages/${user.profileImage}`}
//             alt="Profile"
//             className="profile-image"
//           />
//         )}
//         <div class="custom-file-input-container">
//           <label for="fileInput" class="custom-file-label">
//             <span class="custom-file-label-text">Choose File</span>
//           </label>
//           <input
//             id="fileInput"
//             class="custom-file-input"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </div>
//       </div>
//       <button className="submit-button" onClick={handleSubmit}>
//         Save Changes
//       </button>
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./ProfilePage.css"; // Import CSS file for styling
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     phonenumber: "",
//     profileImage: "",
//   });
//   const [newProfileImage, setNewProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null); // New state for image preview
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch user data from backend based on the user ID
//     axios
//       .get(`http://localhost:5000/auth/users/${id}`)
//       .then((response) => {
//         setUser(response.data.user);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [id]);

//   useEffect(() => {
//     // Update image preview when a new profile image is selected
//     if (newProfileImage) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(newProfileImage);
//     } else {
//       setImagePreview(null);
//     }
//   }, [newProfileImage]);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setNewProfileImage(file);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("username", user.username);
//     formData.append("email", user.email);
//     formData.append("phonenumber", user.phonenumber);
//     if (newProfileImage) {
//       formData.append("profileImage", newProfileImage);
//     }

//     try {
//       await axios.put(`http://localhost:5000/auth/users/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setSuccessMessage("User data updated successfully");
//       setErrorMessage("");

//       // Delay navigation to the dashboard to ensure success message is displayed
//       setTimeout(() => {
//         navigate(`/dashboard/${user._id}`);
//       }, 1000); // 1000 milliseconds delay
//     } catch (error) {
//       setSuccessMessage("");
//       setErrorMessage("Error updating user data");
//       console.error("Error updating user data:", error);
//     }
//   };

//   const handleGoToDashboard = () => {
//     navigate(`/dashboard/${user._id}`);
//   };

//   return (
//     <div className="profile-container">
//       <h2>Profile Page</h2>
//       {successMessage && (
//         <div className="success-message">{successMessage}</div>
//       )}
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       <div className="form-group">
//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           value={user.username}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={user.email}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label>Phone Number:</label>
//         <input
//           type="text"
//           name="phonenumber"
//           value={user.phonenumber}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="form-group">
//         <label>Profile Image:</label>
//         {imagePreview && (
//           <img src={imagePreview} alt="Profile" className="profile-image" />
//         )}
//         {!imagePreview && user.profileImage && (
//           <img
//             src={`http://localhost:5000/uploads/profileImages/${user.profileImage}`}
//             alt="Profile"
//             className="profile-image"
//           />
//         )}
//         <div className="custom-file-input-container">
//           <label for="fileInput" className="custom-file-label">
//             <span className="custom-file-label-text">Choose File</span>
//           </label>
//           <input
//             id="fileInput"
//             className="custom-file-input"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </div>
//       </div>
//       <div className="button-group">
//         <button className="submit-button" onClick={handleSubmit}>
//           Save Changes
//         </button>
//         <button className="dashboard-button" onClick={handleGoToDashboard}>
//           Go to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProfilePage.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phonenumber: "",
    profileImage: "",
  });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from backend based on the user ID
    axios
      .get(`http://localhost:5000/auth/users/${id}`)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  useEffect(() => {
    // Update image preview when a new profile image is selected
    if (newProfileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(newProfileImage);
    } else {
      setImagePreview(null);
    }
  }, [newProfileImage]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProfileImage(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("phonenumber", user.phonenumber);
    if (newProfileImage) {
      formData.append("profileImage", newProfileImage);
    }

    try {
      await axios.put(`http://localhost:5000/auth/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("User data updated successfully");
      setErrorMessage("");

      // Delay navigation to the dashboard to ensure success message is displayed
      setTimeout(() => {
        navigate(`/dashboard/${user._id}`);
      }, 1000); // 1000 milliseconds delay
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Error updating user data");
      console.error("Error updating user data:", error);
    }
  };

  const handleGoToDashboard = () => {
    navigate(`/dashboard/${user._id}`);
  };

  return (
    <div className="profile-page-container">
      <img
        src="/turn-left.gif" // Path to your gif
        alt="Go to Dashboard"
        className="dashboard-button"
        onClick={handleGoToDashboard}
      />
      <div className="profile-container">
        <h2>Profile Page</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phonenumber"
            value={user.phonenumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Profile Image:</label>
          {imagePreview && (
            <img src={imagePreview} alt="Profile" className="profile-image" />
          )}
          {!imagePreview && user.profileImage && (
            <img
              src={`http://localhost:5000/uploads/profileImages/${user.profileImage}`}
              alt="Profile"
              className="profile-image"
            />
          )}
          <div className="custom-file-input-container">
            <label for="fileInput" className="custom-file-label">
              <span className="custom-file-label-text">Choose File</span>
            </label>
            <input
              id="fileInput"
              className="custom-file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="button-group">
          <button className="submit-button" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
