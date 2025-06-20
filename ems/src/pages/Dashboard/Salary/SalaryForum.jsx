import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchDepartment, getEmployee } from '../../../utils/EmployeeHelper';
import { useNavigate } from 'react-router-dom';

export default function SalaryForm() {
  const [departments, setDepartments] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [employee, setEmployee] = useState({
    employeeId: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    payDate: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartment().then(setDepartments);
  }, []);

  const handleDepartment = async (e) => {
    const employees = await getEmployee(e.target.value);
    setEmployeeList(employees);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8000/api/salary/add',
        employee,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      if (res.data.success) {
        console.log('Salary submitted successfully:', res.data);
        navigate('/admin-dashboard/salary');
      }
    } catch (err) {
      console.error('Failed to submit salary:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-medium-bg rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">Salary Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-white">Department</label>
            <select
              onChange={handleDepartment}
              className="w-full bg-light-bg px-4 py-2 rounded"
            >
              <option>Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.departmentName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-white">Employee</label>
            <select
              name="employeeId"
              value={employee.employeeId}
              onChange={handleInputChange}
              className="w-full bg-light-bg px-4 py-2 rounded"
              required
            >
              <option>Select Employee</option>
              {employeeList.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-white">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              value={employee.basicSalary}
              onChange={handleInputChange}
              className="w-full bg-light-bg px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="text-white">Allowances</label>
            <input
              type="number"
              name="allowances"
              value={employee.allowances}
              onChange={handleInputChange}
              className="w-full bg-light-bg px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="text-white">Deductions</label>
            <input
              type="number"
              name="deductions"
              value={employee.deductions}
              onChange={handleInputChange}
              className="w-full bg-light-bg px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="text-white">Pay Date</label>
            <input
              type="date"
              name="payDate"
              value={employee.payDate}
              onChange={handleInputChange}
              className="w-full bg-light-bg px-4 py-2 rounded"
              required
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 px-6 py-2 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
