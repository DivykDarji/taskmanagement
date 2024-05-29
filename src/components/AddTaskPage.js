// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddTask.css';

// const AddTaskPage = ({ userId, closeModal, updateTasks }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [dueTime, setDueTime] = useState('');
//   const [priority, setPriority] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [assignees, setAssignees] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [error, setError] = useState('');
//   const [titleError, setTitleError] = useState('');
//   const [descriptionError, setDescriptionError] = useState('');
//   const [dueDateError, setDueDateError] = useState('');
//   const [dueTimeError, setDueTimeError] = useState('');
//   const [priorityError, setPriorityError] = useState('');
//   const [categoriesError, setCategoriesError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Reset previous errors
//       setTitleError('');
//       setDescriptionError('');
//       setDueDateError('');
//       setDueTimeError('');
//       setPriorityError('');
//       setCategoriesError('');

//       // Validate form fields
//       let hasError = false;

//       if (title.trim().length < 3) {
//         setTitleError('Title must be at least 3 characters');
//         hasError = true;
//       }
//       if (description.trim().length < 10) {
//         setDescriptionError('Description must be at least 10 characters');
//         hasError = true;
//       }
//       if (!dueDate) {
//         setDueDateError('Due date is required');
//         hasError = true;
//       }
//       if (!dueTime) {
//         setDueTimeError('Due time is required');
//         hasError = true;
//       }
//       if (!priority) {
//         setPriorityError('Priority is required');
//         hasError = true;
//       }
//       if (categories.length === 0) {
//         setCategoriesError('Categories are required');
//         hasError = true;
//       }

//       if (hasError) {
//         setError('Please fill in all required fields');
//         return;
//       }

//       const fullDueDateTime = new Date(`${dueDate}T${dueTime}`);

//       // Prepare assignees array
//       const assigneesArray = assignees.length > 0 ? assignees.split(',').map(assignee => ({ user: assignee.trim() })) : [];

//       // Prepare comments array
//       const commentsArray = comments.length > 0 ? comments.split(',').map(comment => ({ content: comment.trim() })) : [];

//       const taskData = {
//         title,
//         description,
//         dueDateTime: fullDueDateTime, // Ensure this field name matches the schema
//         priority,
//         categories: categories.map(category => category.trim()),
//         assignees: assigneesArray,
//         comments: commentsArray,
//         createdBy: userId
//       };
//       // eslint-disable-next-line
//       const response = await axios.post('http://localhost:5000/tasks', taskData);
      
//       // Call the updateTasks and closeModal functions after successful addition
//       updateTasks();
//       closeModal();
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error) {
//         setError(error.response.data.error);
//       } else {
//         setError('Failed to add task');
//       }
//       console.error('Error adding task:', error);
//     }
//   };

  
//   return (
//     <div className="add-task-page">
//       <h1>Add Task</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//           {titleError && <p className="error">{titleError}</p>}
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
//           {descriptionError && <p className="error">{descriptionError}</p>}
//         </div>
//         <div>
//           <label>Due Date:</label>
//           <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
//           {dueDateError && <p className="error">{dueDateError}</p>}
//         </div>
//         <div>
//           <label>Due Time:</label>
//           <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} required />
//           {dueTimeError && <p className="error">{dueTimeError}</p>}
//         </div>
//         <div>
//           <label>Priority:</label>
//           <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
//             <option value="">Select Priority</option>
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//           {priorityError && <p className="error">{priorityError}</p>}
//         </div>
//         <div>
//           <label>Categories:</label>
//           <input type="text" value={categories} onChange={(e) => setCategories(e.target.value.split(','))} />
//           {categoriesError && <p className="error">{categoriesError}</p>}
//         </div>
//         <div>
//           <label>Assignees (optional):</label>
//           <input type="text" value={assignees} onChange={(e) => setAssignees(e.target.value.split(','))} />
//         </div>
//         <div>
//           <label>Comments (optional):</label>
//           <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
//         </div>
//         {error && <p className="error">{error}</p>}
//         <button type="submit">Add Task</button>
//       </form>
//     </div>
//   );
// };

// export default AddTaskPage;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddTask.css';

// const AddTaskPage = ({ userId, closeModal, updateTasks }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [dueTime, setDueTime] = useState('');
//   const [priority, setPriority] = useState('');
//   const [categories, setCategories] = useState('');
//   const [assignees, setAssignees] = useState('');
//   const [comments, setComments] = useState('');
//   const [error, setError] = useState('');
//   const [titleError, setTitleError] = useState('');
//   const [descriptionError, setDescriptionError] = useState('');
//   const [dueDateError, setDueDateError] = useState('');
//   const [dueTimeError, setDueTimeError] = useState('');
//   const [priorityError, setPriorityError] = useState('');
//   const [categoriesError, setCategoriesError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Reset previous errors
//       setTitleError('');
//       setDescriptionError('');
//       setDueDateError('');
//       setDueTimeError('');
//       setPriorityError('');
//       setCategoriesError('');

//       // Validate form fields
//       let hasError = false;

//       if (title.trim().length < 3) {
//         setTitleError('Title must be at least 3 characters');
//         hasError = true;
//       }
//       if (description.trim().length < 10) {
//         setDescriptionError('Description must be at least 10 characters');
//         hasError = true;
//       }
//       if (!dueDate) {
//         setDueDateError('Due date is required');
//         hasError = true;
//       }
//       if (!dueTime) {
//         setDueTimeError('Due time is required');
//         hasError = true;
//       }
//       if (!priority) {
//         setPriorityError('Priority is required');
//         hasError = true;
//       }
//       if (categories.trim() === '') {
//         setCategoriesError('Categories are required');
//         hasError = true;
//       }

//       if (hasError) {
//         setError('Please fill in all required fields');
//         return;
//       }

//       const fullDueDateTime = new Date(`${dueDate}T${dueTime}`);

//       // Prepare assignees array
//       const assigneesArray = assignees ? assignees.split(',').map(assignee => assignee.trim()) : [];

//       // Prepare comments array
//       const commentsArray = comments ? comments.split(',').map(comment => ({ content: comment.trim() })) : [];

//       const taskData = {
//         title,
//         description,
//         dueDateTime: fullDueDateTime, // Ensure this field name matches the schema
//         priority,
//         categories: categories.split(',').map(category => category.trim()),
//         assignees: assigneesArray,
//         comments: commentsArray,
//         createdBy: userId
//       };
      
//       const response = await axios.post('http://localhost:5000/tasks', taskData);

//       // Call the updateTasks and closeModal functions after successful addition
//       updateTasks();
//       closeModal();
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.error) {
//         setError(error.response.data.error);
//       } else {
//         setError('Failed to add task');
//       }
//       console.error('Error adding task:', error);
//     }
//   };

//   return (
//     <div className="add-task-page">
//       <h1>Add Task</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//           {titleError && <p className="error">{titleError}</p>}
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
//           {descriptionError && <p className="error">{descriptionError}</p>}
//         </div>
//         <div>
//           <label>Due Date:</label>
//           <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
//           {dueDateError && <p className="error">{dueDateError}</p>}
//         </div>
//         <div>
//           <label>Due Time:</label>
//           <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} required />
//           {dueTimeError && <p className="error">{dueTimeError}</p>}
//         </div>
//         <div>
//           <label>Priority:</label>
//           <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
//             <option value="">Select Priority</option>
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//           {priorityError && <p className="error">{priorityError}</p>}
//         </div>
//         <div>
//           <label>Categories:</label>
//           <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} required />
//           {categoriesError && <p className="error">{categoriesError}</p>}
//         </div>
//         <div>
//           <label>Assignees (optional):</label>
//           <input type="text" value={assignees} onChange={(e) => setAssignees(e.target.value)} />
//         </div>
//         <div>
//           <label>Comments (optional):</label>
//           <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
//         </div>
//         {error && <p className="error">{error}</p>}
//         <button type="submit">Add Task</button>
//       </form>
//     </div>
//   );
// };

// export default AddTaskPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddTask.css';

const AddTaskPage = ({ userId, closeModal, updateTasks, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('');
  const [categories, setCategories] = useState('');
  const [assignees, setAssignees] = useState('');
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dueDateError, setDueDateError] = useState('');
  const [dueTimeError, setDueTimeError] = useState('');
  const [priorityError, setPriorityError] = useState('');
  const [categoriesError, setCategoriesError] = useState('');

  // Populate form fields with task details when editing
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.dueDateTime ? task.dueDateTime.split('T')[0] : '');
      setDueTime(task.dueDateTime ? task.dueDateTime.split('T')[1].slice(0, -3) : '');
      setPriority(task.priority || '');
      setCategories(task.categories ? task.categories.join(', ') : '');
      setAssignees(task.assignees ? task.assignees.join(', ') : '');
      setComments(task.comments ? task.comments.map(comment => comment.content).join(', ') : '');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Reset previous errors
      setTitleError('');
      setDescriptionError('');
      setDueDateError('');
      setDueTimeError('');
      setPriorityError('');
      setCategoriesError('');

      // Validate form fields
      let hasError = false;

      if (title.trim().length < 3) {
        setTitleError('Title must be at least 3 characters');
        hasError = true;
      }
      if (description.trim().length < 10) {
        setDescriptionError('Description must be at least 10 characters');
        hasError = true;
      }
      if (!dueDate) {
        setDueDateError('Due date is required');
        hasError = true;
      }
      if (!dueTime) {
        setDueTimeError('Due time is required');
        hasError = true;
      }
      if (!priority) {
        setPriorityError('Priority is required');
        hasError = true;
      }
      if (categories.trim() === '') {
        setCategoriesError('Categories are required');
        hasError = true;
      }

      if (hasError) {
        setError('Please fill in all required fields');
        return;
      }

      const fullDueDateTime = new Date(`${dueDate}T${dueTime}`);

      // Prepare assignees array
      const assigneesArray = assignees ? assignees.split(',').map(assignee => assignee.trim()) : [];

      // Prepare comments array
      const commentsArray = comments ? comments.split(',').map(comment => ({ content: comment.trim() })) : [];

      const taskData = {
        title,
        description,
        dueDateTime: fullDueDateTime,
        priority,
        categories: categories.split(',').map(category => category.trim()),
        assignees: assigneesArray,
        comments: commentsArray,
        createdBy: userId
      };
      
      if (task) {
        // If task exists, send a PUT request to update the task
        await axios.put(`http://localhost:5000/tasks/${task._id}`, taskData);
      } else {
        // Otherwise, send a POST request to create a new task
        await axios.post('http://localhost:5000/tasks', taskData);
      }

      // Call the updateTasks and closeModal functions after successful addition/editing
      updateTasks();
      closeModal();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Failed to add/edit task');
      }
      console.error('Error adding/editing task:', error);
    }
  };

  return (
    <div className="add-task-page">
       <h1>{task ? 'Edit Task' : 'Add Task'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          {titleError && <p className="error">{titleError}</p>}
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          {descriptionError && <p className="error">{descriptionError}</p>}
        </div>
        <div>
          <label>Due Date:</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          {dueDateError && <p className="error">{dueDateError}</p>}
        </div>
        <div>
          <label>Due Time:</label>
          <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} required />
          {dueTimeError && <p className="error">{dueTimeError}</p>}
        </div>
        <div>
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {priorityError && <p className="error">{priorityError}</p>}
        </div>
        <div>
          <label>Categories:</label>
          <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} required />
          {categoriesError && <p className="error">{categoriesError}</p>}
        </div>
        <div>
          <label>Assignees (optional):</label>
          <input type="text" value={assignees} onChange={(e) => setAssignees(e.target.value)} />
        </div>
        <div>
          <label>Comments (optional):</label>
          <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskPage;


