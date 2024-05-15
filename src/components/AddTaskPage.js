import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddTask.css';

const AddTaskPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/tasks', {
                title,
                description,
                dueDate,
                priority,
                createdBy: id
            });
            // If successful, navigate back to the dashboard or any other desired page
            navigate(`/dashboard/${id}`);
        } catch (error) {
            setError('Failed to add task');
            console.error('Error adding task:', error);
        }
    };

    return (
        <div>
            <h1>Add Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Due Date:</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                </div>
                <div>
                    <label>Priority:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default AddTaskPage;
