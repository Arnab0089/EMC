import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/employees/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        if (response.data.success) {
          setEmployee(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  const imageUrl = employee.userId?.profileImage
    ? `http://localhost:8000/uploads/${employee.userId.profileImage}`
    : '/default-avatar.png';

  const formatINR = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(value || 0);

  return (
    <>
      {/* Full image modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={imageUrl}
            alt="Full Profile"
            className="max-w-[90%] max-h-[80%] rounded-xl shadow-xl border-4 border-white"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Card */}
      <div className="max-w-3xl mx-auto mt-12 bg-medium-bg p-8 rounded-xl shadow-lg border border-gray-300">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">
          Employee Details
        </h2>

        <div className="flex justify-center mb-8">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-2 border-primary shadow-md cursor-pointer hover:scale-105 transition"
            onClick={() => setIsModalOpen(true)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-avatar.png';
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-base">
          <div>
            <span className="font-semibold text-white">Full Name:</span>{' '}
            {employee.fullName}
          </div>
          <div>
            <span className="font-semibold text-white">Employee ID:</span>{' '}
            {employee.employeeId}
          </div>
          <div>
            <span className="font-semibold text-white">Email:</span>{' '}
            {employee.email}
          </div>
          <div>
            <span className="font-semibold text-white">Phone:</span>{' '}
            {employee.phoneNumber}
          </div>
          <div>
            <span className="font-semibold text-white">Gender:</span>{' '}
            {employee.gender}
          </div>
          <div>
            <span className="font-semibold text-white">Marital Status:</span>{' '}
            {employee.maritalStatus}
          </div>
          <div>
            <span className="font-semibold text-white">Date of Birth:</span>{' '}
            {new Date(employee.dob).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold text-white">Department:</span>{' '}
            {employee.department?.departmentName || 'N/A'}
          </div>
          <div>
            <span className="font-semibold text-white">Salary:</span>{' '}
            <span className="text-medium-dark-bg">
              {formatINR(employee.salary)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
