const Task = require("./models/task");

async function updateExistingTasks() {
    try {
        // Find all existing tasks
        const tasks = await Task.find({});

        // Iterate over each task and update properties
        for (const task of tasks) {
            // Update task properties here
            // For example, if you want to add a new field 'isDeleted' and set it to false for existing tasks:
            task.isDeleted = false;

            // Save the updated task
            await task.save();
        }

        console.log("Existing tasks updated successfully");
    } catch (error) {
        console.error("Error updating existing tasks:", error);
    }
}

module.exports = updateExistingTasks;