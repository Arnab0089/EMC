import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaUsers } from 'react-icons/fa';
import { FcDepartment } from 'react-icons/fc';
import { TfiMoney } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import TaskList from '../../component/TaskList/TaskList';
import {
  fetchEmployeeCount,
  fetchDepartmentCount,
} from '../../utils/EmployeeCount'; // no .jsx here
import { use } from 'react';

export default function AdminSummary() {
  const [employeecount, setEmployeecount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  useEffect(() => {
    const getEmployeeCount = async () => {
      const count = await fetchEmployeeCount();
      setEmployeecount(count);
    };
    getEmployeeCount();
  }, []);

  useEffect(() => {
    const getDepartmentCount = async () => {
      const count = await fetchDepartmentCount();
      setDepartmentCount(count);
    };
    getDepartmentCount();
  }, []);

  const navigate = useNavigate();
  return (
    <div className=" px-4 py-3 shadow-md rounded-md">
      <h3 className="text-xl font-semibold text-blue-300 md:text-4xl mb-4">
        Dashboard Overview
      </h3>
      <div className="lg:grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          icons={<FaUsers />}
          text="Total Employees"
          number={employeecount}
        />
        <SummaryCard
          icons={<FcDepartment />}
          text="Total Departments"
          number={departmentCount}
        />
        <SummaryCard
          icons={<TfiMoney />}
          text="Total Salaries"
          number={'$5000'}
        />
      </div>

      <div className="mt-8 flex justify-between items-center">
        <h4 className="text-lg font-semibold text-white">Recent Tasks</h4>
        <button
          onClick={() => navigate('/create-task')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow"
        >
          + Create Task
        </button>
      </div>
      <TaskList />
    </div>
  );
}
