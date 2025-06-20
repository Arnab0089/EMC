import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL as API } from '../../../url';

export default function EditDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [totalEmployees, setTotalEmployees] = useState(0); // display-only
  const [loading, setLoading] = useState(false);

  // Fetch existing department
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`${API}/api/departments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const dep = response.data.data;
        setDepartmentName(dep.departmentName);
        setDescription(dep.description);
        setTotalEmployees(dep.totalEmployees); // display only
      } catch (error) {
        console.error('Failed to fetch department:', error);
      }
    };

    fetchDepartment();
  }, [id]);

  // Update department
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `${API}/api/departments/update/${id}`,
        {
          departmentName,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      navigate('/admin-dashboard/departments');
    } catch (error) {
      console.error('Failed to update department:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-medium-bg rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 md:text-2xl text-yellow-500">
        Edit Department
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Department Name
          </label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Total Employees
          </label>
          <input
            type="number"
            value={totalEmployees}
            disabled
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          {loading ? 'Updating...' : 'Update Department'}
        </button>
      </form>
    </div>
  );
}
