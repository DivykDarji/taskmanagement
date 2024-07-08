
  const express = require('express');
  // const mongoose = require('mongoose');
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

  // Get all tasks with pagination and search
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.search || '';

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const regex = new RegExp(searchQuery, 'i');

    const tasks = await Task.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        // Add more fields for search if needed
      ]
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex)
      .populate('assignees.user', 'username')
      .populate('comments.user', 'username');

    const totalTasks = await Task.countDocuments({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        // Add more fields for search if needed
      ]
    });

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
    };

    if (endIndex < totalTasks) {
      pagination.nextPage = page + 1;
    }

    if (startIndex > 0) {
      pagination.prevPage = page - 1;
    }

    res.json({ tasks, pagination });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get task count
router.get('/count', async (req, res) => {
  try {
    const taskCount = await Task.countDocuments();
    res.json({ taskCount });
  } catch (error) {
    console.error('Error fetching task count:', error);
    res.status(500).json({ message: 'Failed to fetch task count', error: error.message });
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
router.put('/complete/:taskId', async (req, res) => {
  const { taskId } = req.params;
  try {
    // Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the task is already completed
    if (task.completed) {
      return res.status(400).json({ message: 'Task is already completed' });
    }

    // Update the task completion status and completedAt timestamp
    task.completed = true;
    task.completedAt = new Date();

    // Save the updated task
    await task.save();

    res.json({ message: 'Task completed successfully', task });
  } catch (error) {
    console.error('Error updating task completion:', error);
    res.status(500).json({ message: 'Failed to update task completion', error: error.message });
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
  // router.put('/:id', async (req, res) => {
  //   const taskId = req.params.id;
  //   const updatedTaskData = req.body;

  //   try {
  //     const task = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
  //     if (!task) {
  //       return res.status(404).json({ message: 'Task not found' });
  //     }
  //     res.json(task);
  //   } catch (error) {
  //     console.error('Error updating task:', error);
  //     res.status(500).json({ message: 'Failed to update task', error: error.message });
  //   }
  // });

  // Update a task
router.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDateTime, priority, assignees, comments } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDateTime = dueDateTime || task.dueDateTime;
    task.priority = priority || task.priority;

    // Handle assignees and comments if needed
    if (assignees && assignees.length > 0) {
      task.assignees = assignees;
    }
    if (comments && comments.length > 0) {
      task.comments = comments;
    }

    await task.save();

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: error.message });
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
