// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./ProfilePage.css"; // Import CSS file for styling
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify"; // Import Toastify
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
// import PasswordChangeForm from "./PasswordChangeForm"; // Import the PasswordChangeForm component
// import { Tabs, Tab, Box, Typography } from "@mui/material";

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
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("profile");

//   useEffect(() => {
//     // Fetch user data from backend based on the user ID
//     axios
//       .get(`https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`)
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
//       await axios.put(`https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success("User data updated successfully"); // Success Toastify message
//       setTimeout(() => {
//         navigate(`/dashboard/${user._id}`);
//       }, 1000); // 1000 milliseconds delay
//     } catch (error) {
//       toast.error("Error updating user data"); // Error Toastify message
//       console.error("Error updating user data:", error);
//     }
//   };

//   const handleGoToDashboard = () => {
//     navigate(`/dashboard/${user._id}`);
//   };

//   return (
//     <div className="profile-page-container">
//       <ToastContainer />
//       <img
//         src="/turn-left.gif" // Path to your gif
//         alt="Go to Dashboard"
//         className="dashboard-button"
//         onClick={handleGoToDashboard}
//       />
//       <div className="profile-container">
//         <Tabs
//           value={activeTab}
//           onChange={(event, newValue) => setActiveTab(newValue)}
//           sx={{
//             display: "flex",
//             justifyContent: "space-around",
//             background: "linear-gradient(to right, #ffffff, #f8f8f8)", // Gradient background
//             "& .MuiTabs-indicator": {
//               backgroundColor: "#4caf50", // Change to green color
//             },
//             "& .MuiTabs-flexContainer": {
//               "& .MuiTab-root": {
//                 position: "relative",
//                 cursor: "pointer",
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 borderBottom: "2px solid transparent",
//                 transition: "all 0.3s ease", // Smooth transition on hover
//                 "&:hover": {
//                   backgroundColor: "#f0f0f0", // Background color on hover
//                 },
//                 "&.Mui-selected": {
//                   color: "#4caf50",
//                   fontWeight: "bold", // Increase font weight for active tab
//                 },
//                 "& .MuiTab-labelIcon": {
//                   marginRight: "5px", // Add space between icon and label
//                 },
//               },
//             },
//           }}
//         >
//           <Tab label="Profile Page" value="profile" />
//           <Tab label="Change Password" value="changePassword" />
//         </Tabs>
//         <TabPanel value="profile" activeTab={activeTab}>
//           <div className="form-group">
//             <label>Username:</label>
//             <input
//               type="text"
//               name="username"
//               value={user.username}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Phone Number:</label>
//             <input
//               type="text"
//               name="phonenumber"
//               value={user.phonenumber}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Profile Image:</label>
//             {imagePreview && (
//               <img src={imagePreview} alt="Profile" className="profile-image" />
//             )}
//             {!imagePreview && user.profileImage && (
//               <img
//                 src={`https://taskmangement-backend-v1o7.onrender.com/uploads/profileImages/${user.profileImage}`}
//                 alt="Profile"
//                 className="profile-image"
//               />
//             )}
//             <div className="custom-file-input-container">
//               <label htmlFor="fileInput" className="custom-file-label">
//                 <span className="custom-file-label-text">Choose File</span>
//               </label>
//               <input
//                 id="fileInput"
//                 className="custom-file-input"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </div>
//           </div>
//           <div className="button-group">
//             <button className="submit-button" onClick={handleSubmit}>
//               Save Changes
//             </button>
//           </div>
//         </TabPanel>
//         <TabPanel value="changePassword" activeTab={activeTab}>
//           <PasswordChangeForm userId={id} />
//         </TabPanel>
//       </div>
//     </div>
//   );
// };

// const TabPanel = ({ children, value, activeTab }) => {
//   return (
//     <div role="tabpanel" hidden={value !== activeTab}>
//       {value === activeTab && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PasswordChangeForm from "./PasswordChangeForm";
// import { Tabs, Tab, Box, Typography } from "@mui/material";
// import "./ProfilePage.css";

// const ProfilePage = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     phonenumber: "",
//     profileImage: "",
//   });
//   const [newProfileImage, setNewProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("profile");

//   useEffect(() => {
//     axios
//       .get(`https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`)
//       .then((response) => {
//         setUser(response.data.user);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [id]);

//   useEffect(() => {
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
//       await axios.put(`https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success("User data updated successfully");
//       setTimeout(() => {
//         navigate(`/dashboard/${user._id}`);
//       }, 1000);
//     } catch (error) {
//       toast.error("Error updating user data");
//       console.error("Error updating user data:", error);
//     }
//   };

//   const handleGoToDashboard = () => {
//     navigate(`/dashboard/${user._id}`);
//   };

//   return (
//     <div className="profile-page-container">
//       <ToastContainer />
//       <img
//         src="/turn-left.gif"
//         alt="Go to Dashboard"
//         className="dashboard-button"
//         onClick={handleGoToDashboard}
//       />
//       <div className="profile-container">
//         <Tabs
//           value={activeTab}
//           onChange={(event, newValue) => setActiveTab(newValue)}
//           sx={{
//             display: "flex",
//             justifyContent: "space-around",
//             background: "linear-gradient(to right, #ffffff, #f8f8f8)",
//             "& .MuiTabs-indicator": {
//               backgroundColor: "#4caf50",
//             },
//             "& .MuiTabs-flexContainer": {
//               "& .MuiTab-root": {
//                 position: "relative",
//                 cursor: "pointer",
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 borderBottom: "2px solid transparent",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#f0f0f0",
//                 },
//                 "&.Mui-selected": {
//                   color: "#4caf50",
//                   fontWeight: "bold",
//                 },
//                 "& .MuiTab-labelIcon": {
//                   marginRight: "5px",
//                 },
//               },
//             },
//           }}
//         >
//           <Tab label="Profile Page" value="profile" />
//           <Tab label="Change Password" value="changePassword" />
//         </Tabs>
//         <TabPanel value="profile" activeTab={activeTab}>
//           <div className="form-group">
//             <label>Username:</label>
//             <input
//               type="text"
//               name="username"
//               value={user.username}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Phone Number:</label>
//             <input
//               type="text"
//               name="phonenumber"
//               value={user.phonenumber}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Profile Image:</label>
//             {imagePreview && (
//               <img src={imagePreview} alt="Profile" className="profile-image" />
//             )}
//             {!imagePreview && user.profileImage && (
//               <img
//                 src={user.profileImage} // Using Firebase Storage URL directly
//                 alt="Profile"
//                 className="profile-image"
//               />
//             )}
//             <div className="custom-file-input-container">
//               <label htmlFor="fileInput" className="custom-file-label">
//                 <span>{newProfileImage ? newProfileImage.name : "Choose file"}</span>
//               </label>
//               <input
//                 type="file"
//                 id="fileInput"
//                 onChange={handleImageChange}
//                 style={{ display: "none" }}
//               />
//             </div>
//           </div>
//           <button onClick={handleSubmit}>Update</button>
//         </TabPanel>
//         <TabPanel value="changePassword" activeTab={activeTab}>
//           <PasswordChangeForm />
//         </TabPanel>
//       </div>
//     </div>
//   );
// };

// function TabPanel(props) {
//   const { value, activeTab, children } = props;
//   return (
//     <div role="tabpanel" hidden={activeTab !== value}>
//       {activeTab === value && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// export default ProfilePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PasswordChangeForm from "./PasswordChangeForm";
// import { Tabs, Tab, Box, Typography } from "@mui/material";
// import "./ProfilePage.css";

// const ProfilePage = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     phonenumber: "",
//     profileImage: "",
//   });
//   const [newProfileImage, setNewProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const navigate = useNavigate();
//   // eslint-disable-next-line
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const [activeTab, setActiveTab] = useState("profile");

//   // Fetch user data
//   useEffect(() => {
//     axios
//       .get(`https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`)
//       .then((response) => {
//         setUser(response.data.user);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [id]);

//   // Preview new profile image
//   useEffect(() => {
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
//     setIsLoading(true); // Start loading
//     const formData = new FormData();
    
//     // Append user data
//     formData.append("username", user.username || "");
//     formData.append("email", user.email || "");
//     formData.append("phonenumber", user.phonenumber || "");
  
//     // Append new profile image if present
//     if (newProfileImage) {
//       formData.append("profileImage", newProfileImage);
//     }
    
//     try {
//       const response = await axios.put(
//         `https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       toast.success("User data updated successfully");
  
//       setUser((prevUser) => ({
//         ...prevUser,
//         profileImage: response.data.user.profileImage || prevUser.profileImage,
//         username: response.data.user.username || prevUser.username,
//         email: response.data.user.email || prevUser.email,
//         phonenumber: response.data.user.phonenumber || prevUser.phonenumber,
//       }));
  
//       setTimeout(() => {
//         navigate(`/dashboard/${id}`);
//       }, 1000);
//     } catch (error) {
//       toast.error("Error updating user data");
//       console.error("Error updating user data:", error.response?.data || error.message);
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };


//   return (
//     <div className="profile-page-container">
//       <ToastContainer />      
//       <div className="profile-container">
//         <Tabs
//           value={activeTab}
//           onChange={(event, newValue) => setActiveTab(newValue)}
//           sx={{
//             display: "flex",
//             justifyContent: "space-around",
//             background: "linear-gradient(to right, #ffffff, #f8f8f8)",
//             "& .MuiTabs-indicator": {
//               backgroundColor: "#4caf50",
//             },
//             "& .MuiTabs-flexContainer": {
//               "& .MuiTab-root": {
//                 position: "relative",
//                 cursor: "pointer",
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 borderBottom: "2px solid transparent",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#f0f0f0",
//                 },
//                 "&.Mui-selected": {
//                   color: "#4caf50",
//                   fontWeight: "bold",
//                 },
//                 "& .MuiTab-labelIcon": {
//                   marginRight: "5px",
//                 },
//               },
//             },
//           }}
//         >
//           <Tab label="Profile Page" value="profile" />
//           <Tab label="Change Password" value="changePassword" />
//         </Tabs>
//         <TabPanel value="profile" activeTab={activeTab}>
//           <div className="form-group">
//             <label>Username:</label>
//             <input
//               type="text"
//               name="username"
//               value={user.username}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Phone Number:</label>
//             <input
//               type="text"
//               name="phonenumber"
//               value={user.phonenumber}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Profile Image:</label>
//             {imagePreview && (
//               <img src={imagePreview} alt="Profile" className="profile-image" />
//             )}
//             {!imagePreview && user.profileImage && (
//               <img
//                 src={user.profileImage} // Displaying the Firebase Storage URL
//                 alt="Profile"
//                 className="profile-image"
//               />
//             )}
//             <div className="custom-file-input-container">
//               <label htmlFor="fileInput" className="custom-file-label">
//                 <span>
//                   {newProfileImage ? newProfileImage.name : "Choose file"}
//                 </span>
//               </label>
//               <input
//                 type="file"
//                 id="fileInput"
//                 onChange={handleImageChange}
//                 style={{ display: "none" }}
//               />
//             </div>
//           </div>
//           <button 
//             onClick={handleSubmit} 
//             className="update-button"
//             disabled={isLoading} // Disable button during loading
//           >
//             {isLoading ? <div className="loader"></div> : 'Update'}
//           </button>
//         </TabPanel>
//         <TabPanel value="changePassword" activeTab={activeTab}>
//           <PasswordChangeForm />
//         </TabPanel>
//       </div>
//     </div>
//   );
// };

// function TabPanel(props) {
//   const { value, activeTab, children } = props;
//   return (
//     <div role="tabpanel" hidden={activeTab !== value}>
//       {activeTab === value && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordChangeForm from "./PasswordChangeForm";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phonenumber: "",
    profileImage: "",
  });
  const [initialUser, setInitialUser] = useState(null); // Store initial values
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    axios
      .get(`https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`)
      .then((response) => {
        const fetchedUser = response.data.user;
        setUser(fetchedUser);
        setInitialUser(fetchedUser); // Set initial user values
        setIsChanged(false); // Reset changes when user data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  // Preview new profile image
  useEffect(() => {
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

  // Check if any field or image has changed
  useEffect(() => {
    if (initialUser) {
      const hasChanges =
        user.username !== initialUser.username ||
        user.email !== initialUser.email ||
        user.phonenumber !== initialUser.phonenumber ||
        newProfileImage !== null;
      setIsChanged(hasChanges);
    }
  }, [user, newProfileImage, initialUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProfileImage(file);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("username", user.username || "");
    formData.append("email", user.email || "");
    formData.append("phonenumber", user.phonenumber || "");

    if (newProfileImage) {
      formData.append("profileImage", newProfileImage);
    }

    try {
      const response = await axios.put(
        `https://taskmangement-backend-v1o7.onrender.com/auth/users/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("User data updated successfully");

      setUser((prevUser) => ({
        ...prevUser,
        profileImage: `${response.data.user.profileImage}?timestamp=${new Date().getTime()}` || `${prevUser.profileImage}?timestamp=${new Date().getTime()}`,
        username: response.data.user.username || prevUser.username,
        email: response.data.user.email || prevUser.email,
        phonenumber: response.data.user.phonenumber || prevUser.phonenumber,
      }));

      setIsChanged(false);

      setTimeout(() => {
        navigate(`/dashboard/${id}`);
      }, 1000);
    } catch (error) {
      toast.error("Error updating user data");
      console.error("Error updating user data:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page-container">
      <ToastContainer />
      <div className="profile-container">
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            background: "linear-gradient(to right, #ffffff, #f8f8f8)",
            "& .MuiTabs-indicator": {
              backgroundColor: "#4caf50",
            },
            "& .MuiTabs-flexContainer": {
              "& .MuiTab-root": {
                position: "relative",
                cursor: "pointer",
                padding: "10px 20px",
                fontSize: "16px",
                borderBottom: "2px solid transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                "&.Mui-selected": {
                  color: "#4caf50",
                  fontWeight: "bold",
                },
                "& .MuiTab-labelIcon": {
                  marginRight: "5px",
                },
              },
            },
          }}
        >
          <Tab label="Profile Page" value="profile" />
          <Tab label="Change Password" value="changePassword" />
        </Tabs>
        <TabPanel value="profile" activeTab={activeTab}>
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
                src={user.profileImage}
                alt="Profile"
                className="profile-image"
              />
            )}
            <div className="custom-file-input-container">
              <label htmlFor="fileInput" className="custom-file-label">
                <span>
                  {newProfileImage ? newProfileImage.name : "Choose file"}
                </span>
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <button 
            onClick={handleSubmit} 
            className="update-button"
            disabled={!isChanged || isLoading}
          >
            {isLoading ? <div className="loader"></div> : 'Update'}
          </button>
        </TabPanel>
        <TabPanel value="changePassword" activeTab={activeTab}>
          <PasswordChangeForm />
        </TabPanel>
      </div>
    </div>
  );
};

function TabPanel(props) {
  const { value, activeTab, children } = props;
  return (
    <div role="tabpanel" hidden={activeTab !== value}>
      {activeTab === value && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default ProfilePage;
