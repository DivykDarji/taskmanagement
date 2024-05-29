// const express = require('express');
// const router = express.Router();
// const Task = require('../models/task');
// const User = require('../models/User'); // Ensure the User model is correctly imported

// // Get tasks by user ID
// router.get('/user/:userId', async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const tasks = await Task.find({ createdBy: userId })
//             .populate('assignees.user', 'username') // Populate assignees with username
//             .populate('comments.user', 'username'); // Populate comment user with username
//         res.json(tasks);
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get all tasks with pagination
// router.get('/', async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1; // Parse the page number from query params, default to page 1 if not provided
//         const limit = parseInt(req.query.limit) || 10; // Parse the limit (tasks per page) from query params, default to 10 if not provided

//         const startIndex = (page - 1) * limit; // Calculate the start index of tasks for the current page
//         const endIndex = page * limit; // Calculate the end index of tasks for the current page

//         const tasks = await Task.find()
//             .populate('assignees.user', 'username')
//             .populate('comments.user', 'username')
//             .sort({ createdAt: -1 }) // Sort tasks by createdAt field in descending order
//             .limit(limit) // Limit the number of tasks per page
//             .skip(startIndex); // Skip tasks before the start index for pagination

//         const totalTasks = await Task.countDocuments(); // Get the total number of tasks

//         const pagination = {
//             currentPage: page,
//             totalPages: Math.ceil(totalTasks / limit) // Calculate the total number of pages
//         };

//         // Check if there are more tasks for the next page
//         if (endIndex < totalTasks) {
//             pagination.nextPage = page + 1;
//         }

//         // Check if there are tasks before the current page
//         if (startIndex > 0) {
//             pagination.prevPage = page - 1;
//         }

//         res.json({ tasks, pagination });
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         res.status(500).json({ message: error.message });
//     }
// });


// // Create a new task
// router.post('/', async (req, res) => {
//     const { title, description, dueDateTime, priority, createdBy, categories, assignees, comments } = req.body;

//     try {
//         // Validate the user
//         const user = await User.findById(createdBy);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Validate other fields
//         if (!title || title.trim().length < 3) {
//             return res.status(400).json({ error: 'Title must be at least 3 characters' });
//         }
//         if (!description || description.trim().length < 10) {
//             return res.status(400).json({ error: 'Description must be at least 10 characters' });
//         }
//         if (!dueDateTime) {
//             return res.status(400).json({ error: 'Due date and time are required' });
//         }
//         if (!priority) {
//             return res.status(400).json({ error: 'Priority is required' });
//         }
//         if (!categories || categories.length === 0) {
//             return res.status(400).json({ error: 'Categories are required' });
//         }

//         // Create a new task instance
//         const taskData = { title, description, dueDateTime, priority, createdBy, categories };

//         // Add assignees if provided
//         if (assignees && assignees.length > 0) {
//             taskData.assignees = assignees;
//         }

//         // Add comments if provided
//         if (comments && comments.length > 0) {
//             taskData.comments = comments;
//         }

//         const task = new Task(taskData);

//         // Save the new task to the database
//         const newTask = await task.save();

//         // Send back the newly created task
//         res.status(201).json(newTask);
//     } catch (error) {
//         console.error('Error adding task:', error);
//         res.status(500).json({ message: 'Failed to add task', error: error.message });
//     }
// });

// router.put('/user/:userId/:taskId/complete', async (req, res) => {
//     try {
//       const task = await Task.findOne({ _id: req.params.taskId, createdBy: req.params.userId });
//       if (!task) {
//         return res.status(404).json({ message: 'Task not found for the specified user' });
//       }
//       task.completed = !task.completed;
//       task.completedAt = task.completed ? new Date() : null;
//       await task.save();
//       res.json({ message: 'Task completion status updated successfully', task });
//     } catch (error) {
//       console.error('Error updating task completion:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

// // Other task routes (Get by ID, Update, Delete)
// router.get('/:id', async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id)
//             .populate('assignees.user', 'username') // Populate assignees with username
//             .populate('comments.user', 'username'); // Populate comment user with username
//         if (!task) {
//             return res.status(404).json({ message: 'Task not found' });
//         }
//         res.json(task);
//     } catch (error) {
//         console.error('Error fetching task:', error);
//         res.status(500).json({ message: error.message });
//     }
// });

// // Update task
// router.put('/:id', async (req, res) => {
//     const taskId = req.params.id;
//     const updatedTaskData = req.body;
  
//     try {
//       const task = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
//       if (!task) {
//         return res.status(404).json({ message: 'Task not found' });
//       }
//       res.json(task);
//     } catch (error) {
//       console.error('Error updating task:', error);
//       res.status(500).json({ message: 'Failed to update task', error: error.message });
//     }
//   });
  
//   // Delete task
//   router.delete('/:id', async (req, res) => {
//     try {
//       const deletedTask = await Task.findByIdAndRemove(req.params.id);
//       if (!deletedTask) {
//         return res.status(404).json({ message: 'Task not found' });
//       }
//       res.json({ message: 'Task deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       res.status(500).json({ message: error.message });
//     }
//   });
  
// module.exports = router;

const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/User'); // Ensure the User model is correctly imported

// Get tasks by user ID
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ createdBy: userId })
      .populate('assignees.user', 'username') // Populate assignees with username
      .populate('comments.user', 'username'); // Populate comment user with username
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Parse the page number from query params, default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Parse the limit (tasks per page) from query params, default to 10 if not provided

    const startIndex = (page - 1) * limit; // Calculate the start index of tasks for the current page
    const endIndex = page * limit; // Calculate the end index of tasks for the current page

    const tasks = await Task.find()
      .populate('assignees.user', 'username')
      .populate('comments.user', 'username')
      .sort({ createdAt: -1 }) // Sort tasks by createdAt field in descending order
      .limit(limit) // Limit the number of tasks per page
      .skip(startIndex); // Skip tasks before the start index for pagination

    const totalTasks = await Task.countDocuments(); // Get the total number of tasks

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit), // Calculate the total number of pages
    };

    // Check if there are more tasks for the next page
    if (endIndex < totalTasks) {
      pagination.nextPage = page + 1;
    }

    // Check if there are tasks before the current page
    if (startIndex > 0) {
      pagination.prevPage = page - 1;
    }

    res.json({ tasks, pagination });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { title, description, dueDateTime, priority, createdBy, categories, assignees, comments } = req.body;

  try {
    // Validate the user
    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate other fields
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ error: 'Title must be at least 3 characters' });
    }
    if (!description || description.trim().length < 10) {
      return res.status(400).json({ error: 'Description must be at least 10 characters' });
    }
    if (!dueDateTime) {
      return res.status(400).json({ error: 'Due date and time are required' });
    }
    if (!priority) {
      return res.status(400).json({ error: 'Priority is required' });
    }
    if (!categories || categories.length === 0) {
      return res.status(400).json({ error: 'Categories are required' });
    }

    // Create a new task instance
    const taskData = { title, description, dueDateTime, priority, createdBy, categories };

    // Add assignees if provided
    if (assignees && assignees.length > 0) {
      taskData.assignees = assignees;
    }

    // Add comments if provided
    if (comments && comments.length > 0) {
      taskData.comments = comments;
    }

    const task = new Task(taskData);

    // Save the new task to the database
    const newTask = await task.save();

    // Send back the newly created task
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Failed to add task', error: error.message });
  }
});

// Update task completion status
router.put('/user/:userId/:taskId/complete', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId, createdBy: req.params.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found for the specified user' });
    }
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date() : null;
    await task.save();
    res.json({ message: 'Task completion status updated successfully', task });
  } catch (error) {
    console.error('Error updating task completion:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignees.user', 'username') // Populate assignees with username
      .populate('comments.user', 'username'); // Populate comment user with username
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  const updatedTaskData = req.body;

  try {
    const task = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
