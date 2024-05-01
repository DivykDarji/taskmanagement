// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './UserManagement.css';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phonenumber: '',
//     password: '',
//   });

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/auth/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const updateUser = async (userId) => {
//     try {
//       const userToUpdate = users.find(user => user._id === userId);
//       const updatedUser = { ...userToUpdate, ...formData };
//       await axios.put(`http://localhost:5000/auth/users/${userId}`, updatedUser);
//       fetchUsers(); // Fetch updated user list after successful update
//       setFormData({ username: '', email: '', phonenumber: '', password: '' });
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const deleteUser = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:5000/auth/users/${userId}`);
//       fetchUsers(); // Fetch updated user list after successful deletion
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="container">
//       <h2>User Management</h2>
//       <div className="scrollable-table">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user._id}>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phonenumber}</td>
//                 <td>
//                   <button className="button edit-button" onClick={() => updateUser(user._id)}>Edit</button>
//                   <button className="button delete-button" onClick={() => deleteUser(user._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './UserManagement.css';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phonenumber: '',
//     password: '',
//   });

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/auth/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const updateUser = async (userId) => {
//     try {
//       const userToUpdate = users.find(user => user._id === userId);
//       const updatedUser = { ...userToUpdate, ...formData };
//       await axios.put(`http://localhost:5000/auth/users/${userId}`, updatedUser);
//       fetchUsers(); // Fetch updated user list after successful update
//       setFormData({ username: '', email: '', phonenumber: '', password: '' });
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const deleteUser = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:5000/auth/users/${userId}`);
//       fetchUsers(); // Fetch updated user list after successful deletion
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const addUser = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/auth/users', formData);
//       fetchUsers(); // Fetch updated user list after successful addition
//       setFormData({ username: '', email: '', phonenumber: '', password: '' });
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="container">
//       <h2>User Management</h2>
//       <div className="user-list">
//         {users.map(user => (
//           <div className="user-card" key={user._id}>
//             <h3>{user.username}</h3>
//             <p>Email: {user.email}</p>
//             <p>Phone Number: {user.phonenumber}</p>
//             <div className="button-container">
//               <button className="button edit-button" onClick={() => updateUser(user._id)}>Edit</button>
//               <button className="button delete-button" onClick={() => deleteUser(user._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="user-form">
//         <h2>Add New User</h2>
//         <form onSubmit={addUser}>
//           <input type="text" placeholder="Username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} required />
//           <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
//           <input type="tel" placeholder="Phone Number" value={formData.phonenumber} onChange={e => setFormData({ ...formData, phonenumber: e.target.value })} required />
//           <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
//           <button type="submit" className="button add-button">Add User</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
  });
  const [showEditForm, setShowEditForm] = useState(false);
  const [editUserId, setEditUserId] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user._id === userId);
    setFormData(userToEdit);
    setShowEditForm(true);
    setEditUserId(userId);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/auth/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateUser = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/auth/users/${editUserId}`, formData);
      const updatedUsers = users.map(user => {
        if (user._id === editUserId) {
          return { ...user, ...formData };
        }
        return user;
      });
      setUsers(updatedUsers);
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      <div className="user-list">
        {users.map(user => (
          <div className="user-card" key={user._id}>
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phonenumber}</p>
            <div className="button-container">
              <button className="button edit-button" onClick={() => handleEdit(user._id)}>Edit</button>
              <button className="button delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showEditForm && (
        <div className="user-form">
          <h2>Edit User</h2>
          <form onSubmit={updateUser}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <input type="tel" name="phonenumber" placeholder="Phone Number" value={formData.phonenumber} onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
            <button type="submit" className="button add-button">Update User</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;



