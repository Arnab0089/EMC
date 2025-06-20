import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import employeeTableStyles from '../EmployeeManagement/EmployeeStyle';

export default function ListOfSalary() {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/salary/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.data.success) {
          setSalaryData(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching salary data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaries();
  }, []);

  const columns = [
    {
      name: 'Employee ID',
      selector: (row) => row.employeeId?.employeeId || 'N/A',
      sortable: true,
    },
    {
      name: 'Full Name',
      selector: (row) => row.employeeId?.fullName || 'N/A',
      sortable: true,
    },
    {
      name: 'Department',
      selector: (row) => row.employeeId?.department?.departmentName || 'N/A',
    },
    {
      name: 'Basic Salary',
      selector: (row) => `₹${row.basicSalary}`,
      sortable: true,
    },
    {
      name: 'Allowances',
      selector: (row) => `₹${row.allowances}`,
    },
    {
      name: 'Deductions',
      selector: (row) => `₹${row.deductions}`,
    },
    {
      name: 'Pay Date',
      selector: (row) => new Date(row.payDate).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Salary Records</h2>
        <button
          onClick={() => navigate('/admin-dashboard/salary/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          Add Salary
        </button>
      </div>

      <div className="bg-light-bg rounded shadow-md p-4">
        <DataTable
          columns={columns}
          data={salaryData}
          progressPending={loading}
          customStyles={employeeTableStyles}
          pagination
          highlightOnHover
          striped
          dense
          defaultSortField="payDate"
        />
      </div>
    </div>
  );
}
