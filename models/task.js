const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDateTime: { type: Date, required: true }, // Combined due date and time
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categories: [{ type: String }], // Added field for task categories or labels
    assignees: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String } // Additional field for assignee role/status
    }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        createdAt: { type: Date, default: Date.now }
    }]
});

// 1. Schema Refinement
taskSchema.path('dueDateTime').validate(function (value) {
    return value instanceof Date && !isNaN(value);
}, 'Invalid due date');

// 2. Indexes
taskSchema.index({ dueDateTime: 1, priority: 1 });

// 3. Virtuals
taskSchema.virtual('isOverdue').get(function () {
    return this.dueDateTime < Date.now();
});

// 4. Schema Methods
taskSchema.methods.markCompleted = function () {
    this.completed = true;
    return this.save();
};

module.exports = mongoose.model('Task', taskSchema);
