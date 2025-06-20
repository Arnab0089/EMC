import React, { useEffect, useState } from 'react';
import { fetchDepartment } from '../../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL as API } from '../../../url';

export default function Add() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    employeeId: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    phoneNumber: '',
    department: '',
    salary: '',
    password: '',
    role: '',
    profilePicture: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const data = await fetchDepartment();
      setDepartments(data);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      const response = await axios.post(
        `${API}/api/employees/add`,
        formDataObj,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (response.data.success) {
        console.log('Employee added successfully');
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-medium-bg rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reusable Inputs */}
          {[
            ['Full Name', 'fullName', 'text'],
            ['Email', 'email', 'email'],
            ['Employee ID', 'employeeId', 'text'],
            ['Date of Birth', 'dob', 'date'],
            ['Phone Number', 'phoneNumber', 'number'],
            ['Salary', 'salary', 'number'],
            ['Password', 'password', 'password'],
          ].map(([label, name, type]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-white mb-2">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter ${label.toLowerCase()}`}
                required
              />
            </div>
          ))}

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.departmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center items-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}
