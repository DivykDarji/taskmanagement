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
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/users?page=${currentPage}`);
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/auth/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
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
              <button className="button edit-button"><Link to={`/edit-user/${user._id}`}>Edit</Link></button>
              <button className="button delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default UserManagement;




