import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDepartment } from '../../../utils/EmployeeHelper';
import { API_BASE_URL as API } from '../../../url';

export default function EditEmp() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    userId: { username: '' },
    phoneNumber: '',
    salary: '',
    maritalStatus: '',
    department: '',
    profilePicture: null,
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const data = await fetchDepartment();
      setDepartments(data);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${API}/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setEmployee(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profilePicture') {
      setEmployee((prev) => ({ ...prev, profilePicture: files[0] }));
    } else if (name === 'username') {
      setEmployee((prev) => ({
        ...prev,
        userId: { ...prev.userId, username: value },
      }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append('username', employee.userId.username);
      formDataObj.append('phoneNumber', employee.phoneNumber);
      formDataObj.append('salary', employee.salary);
      formDataObj.append('maritalStatus', employee.maritalStatus);
      formDataObj.append('department', employee.department);
      if (employee.profilePicture) {
        formDataObj.append('profilePicture', employee.profilePicture);
      }

      const response = await axios.put(
        `http://localhost:8000/api/employees/update/${id}`,
        formDataObj,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (response.data.success) {
        console.log('Employee updated successfully');
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-medium-bg rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={employee.userId?.username || ''}
              onChange={handleChange}
              required
              placeholder="Enter Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={employee.maritalStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg"
            >
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              value={employee.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Department
            </label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.departmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              placeholder="Enter Salary"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-light-bg disabled:opacity-50 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center items-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md "
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
}
