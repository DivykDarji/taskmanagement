// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate hooks
// import axios from 'axios';

// const UserEdit = () => { // Remove the 'match' prop
//   const { id } = useParams(); // Use useParams hook to get the 'id' parameter
//   const navigate = useNavigate(); // Use useNavigate hook to navigate to a different route

//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phonenumber: '',
//     password: '',
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/auth/users/${id}`); // Use 'id' from useParams
//         setUser(response.data);
//         setFormData(response.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };
//     fetchUser();
//   }, [id]); // Update the dependency array

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const updateUser = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/auth/users/${id}`, formData); // Use 'id' from useParams
//       navigate('/user-management'); // Navigate to the user management page after updating user
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container">
//       <h2>Edit User</h2>
//       <form onSubmit={updateUser}>
//         <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
//         <input type="tel" name="phonenumber" placeholder="Phone Number" value={formData.phonenumber} onChange={handleInputChange} required />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
//         <button type="submit">Update User</button>
//       </form>
//     </div>
//   );
// };

// export default UserEdit;






import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserEdit.css';


const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      phonenumber: '',
      password: '',
    });
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/auth/users/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }, [id]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const updateUser = async (event) => {
      event.preventDefault();
      try {
        await axios.put(`http://localhost:5000/auth/users/${id}`, formData);
        navigate('/user-management');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  
    return (
      <div className="UserEdit-container">
        <h2 className="UserEdit-title">Edit User</h2>
        <form className="UserEdit-form" onSubmit={updateUser}>
          <input className="UserEdit-input" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
          <input className="UserEdit-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
          <input className="UserEdit-input" type="tel" name="phonenumber" placeholder="Phone Number" value={formData.phonenumber} onChange={handleInputChange} required />
          <input className="UserEdit-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
          <button className="UserEdit-button" type="submit">Update User</button>
        </form>
      </div>
    );
  };
  
  export default UserEdit;
