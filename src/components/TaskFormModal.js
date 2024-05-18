// import React, { useState } from 'react';
// import axios from 'axios';
// import './TaskFormModal.css';

// const TaskFormModal = ({ id, onClose, onAddTask }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [priority, setPriority] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/tasks', {
//         title,
//         description,
//         dueDate,
//         priority,
//         createdBy: id
//       });
//       setError('');
//       // If successful, refresh tasks in the Dashboard
//       onAddTask();
//       onClose();
//     } catch (error) {
//       setError('Failed to add task');
//       console.error('Error adding task:', error);
//     }
//   };

//   return (
//     <div className="modal-background">
//       <div className="modal-content">
//         <h2>Add Task</h2>
//         <form onSubmit={handleSubmit}>
//           <label>Title:</label>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//           <label>Description:</label>
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
//           <label>Due Date:</label>
//           <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
//           <label>Priority:</label>
//           <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
//             <option value="">Select Priority</option>
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//           {error && <p className="error">{error}</p>}
//           <div className="modal-buttons">
//             <button type="submit">Add Task</button>
//             <button type="button" onClick={onClose}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskFormModal;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskFormModal.css';

const TaskFormModal = ({ id, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [categories, setCategories] = useState([]); // State for task categories
  const [assignees, setAssignees] = useState([]); // State for task assignees
  const [comment, setComment] = useState(''); // State for task comment
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch categories and assignees from backend upon component mount
    fetchCategories();
    fetchAssignees();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAssignees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/assignees');
      setAssignees(response.data);
    } catch (error) {
      console.error('Error fetching assignees:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tasks', {
        title,
        description,
        dueDate,
        priority,
        categories,
        assignees,
        createdBy: id
      });
      setError('');
      // If successful, refresh tasks in the Dashboard
      onAddTask();
      onClose();
    } catch (error) {
      setError('Failed to add task');
      console.error('Error adding task:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      await axios.post('http://localhost:5000/tasks/comment', {
        taskId: 'taskId', // Pass taskId here
        comment: comment
      });
      // Reset comment input after successful addition
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          <label>Due Date:</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label>Categories:</label>
          <select multiple value={categories} onChange={(e) => setCategories(Array.from(e.target.selectedOptions, option => option.value))}>
            {/* Options for categories */}
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <label>Assignees:</label>
          <select multiple value={assignees} onChange={(e) => setAssignees(Array.from(e.target.selectedOptions, option => option.value))}>
            {/* Options for assignees */}
            {assignees.map(assignee => (
              <option key={assignee._id} value={assignee._id}>{assignee.name}</option>
            ))}
          </select>
          <button type="submit">Add Task</button>
          {error && <p className="error">{error}</p>}
        </form>
        {/* Section to add comments */}
        <div>
          <label>Add Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskFormModal;
