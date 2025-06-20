import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL as API } from '../../../url';

export default function AddDepartment() {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/api/departments/add`,
        { departmentName, description }, // ⬅️ no totalEmployees here
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (response.data.success) {
        console.log('Department added successfully:', response.data);
        setMessage('Department added successfully');
        setTimeout(() => setMessage(''), 3000);
        navigate('/admin-dashboard/departments');
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Failed to add department';
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 3000);
      console.error('Error adding department:', errorMsg);
    }
  };

  return (
    <div className="bg-medium-dark-bg p-6 rounded-2xl shadow-md border border-gray-200 max-w-xl mx-auto my-10">
      <h3 className="text-2xl font-semibold text-light-bg mb-6">
        Add Department
      </h3>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="department_name"
            className="block text-sm font-medium text-white mb-1"
          >
            Department Name
          </label>
          <input
            type="text"
            id="department_name"
            placeholder="Enter department name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-light-bg"
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-white mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Enter department description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-light-bg"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Removed totalEmployees input — it's not editable */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Add Department
        </button>

        {message && <p className="text-green-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}
