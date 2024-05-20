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
router.put('/:taskId/complete', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.completed = !task.completed;
        if (task.completed) {
            task.completedAt = new Date();
        } else {
            task.completedAt = null;
        }
        await task.save();
        res.json({ message: 'Task completion status updated successfully', task });
    } catch (error) {
        console.error('Error updating task completion:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Other task routes (Get by ID, Update, Delete)
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




router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndRemove(req.params.id);
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