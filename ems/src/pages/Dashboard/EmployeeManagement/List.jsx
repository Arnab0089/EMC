import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import EmployeeHelper from './EmpHelper';
import employeeTableStyles from './EmployeeStyle';
import { API_BASE_URL as API } from '../../../url';

export default function List() {
  const [employees, setEmployees] = useState([]);
  const [emploading, setEmpLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

  // 🔁 Move fetchEmployees to global scope inside component
  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get(`${API}/api/employees/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEmployees(response.data.data);
      setFilteredEmployees(response.data.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setEmpLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    const value = employees.filter((emp) =>
      emp.fullName.toLowerCase().includes(keyword),
    );
    setFilteredEmployees(value);
  };

  const handleEdit = (row) => {
    navigate(`/admin-dashboard/employees/update/${row._id}`);
  };

  const handleDelete = async (row) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${row.fullName}?`,
    );
    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `${API}/api/employees/delete/${row._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (response.data.success) {
        alert('Employee deleted successfully!');
        fetchEmployees(); // ✅ Refresh list after delete
      } else {
        alert('Failed to delete employee.');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Something went wrong while deleting.');
    }
  };

  const handleView = (row) => {
    navigate(`/admin-dashboard/employees/view/${row._id}`);
  };

  return (
    <>
      <div className="p-6 bg-medium-dark-bg rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 p-2 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold bg-light-bg text-medium-dark-bg px-4 py-2 rounded-lg shadow-md">
            Employee Management
          </h2>
          <Link
            to="/admin-dashboard/employees/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Add Employees
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search employees..."
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-light-bg"
          value={search}
          onChange={handleFilter}
        />
      </div>

      <DataTable
        columns={EmployeeHelper(handleEdit, handleDelete, handleView)}
        data={filteredEmployees}
        customStyles={employeeTableStyles}
        progressPending={emploading}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
        noDataComponent="No employees found"
      />
    </>
  );
}
