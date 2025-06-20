import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTask({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('High');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description, date, assignedTo, category, priority };

    try {
      const res = await axios.post('http://localhost:8000/api/tasks/create', taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      onTaskCreated(res.data);
      setMessage('Task created successfully');

      
      setTitle('');
      setDescription('');
      setDate('');
      setAssignedTo('');
      setCategory('');
      setPriority('High');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create task');
    }
  };

  return (
    <div className="min-h-content flex items-center justify-center  p-12">
      <form onSubmit={handleSubmit} className="bg-light-bg p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Task</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-medium-bg p-2 rounded bg-white text-medium-dark-bg"
        />

        <textarea
          name="description"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-medium-bg p-2 rounded bg-white text-medium-dark-bg"
        />

        <input
          type="date"
          name="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-medium-bg p-2 rounded bg-white text-medium-dark-bg"
        />

        <input
          type="text"
          name="assignedTo"
          placeholder="Assign to (user email or ID)"
          required
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full border border-medium-bg p-2 rounded bg-white text-medium-dark-bg"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-medium-bg p-2 rounded bg-white text-medium-dark-bg"
        />

        <select
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-medium-bg p-2 rounded bg-white text-medium-dark-bg"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Task
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
