import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaUsers } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { FcDepartment, FcLeave } from 'react-icons/fc';
import { IoSettings } from 'react-icons/io5';
import { TfiMoney } from 'react-icons/tfi';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:flex">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between bg-gray-800 p-4 text-white">
        <h3 className="text-xl font-bold">Employee MS</h3>
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen w-64 p-4 space-y-4 fixed lg:static top-0 left-0 z-50 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="hidden lg:block mb-6">
          <h3 className="text-2xl font-bold text-blue-400 text-center">
            Employee MS
          </h3>
        </div>

        {/* Links */}
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/admin-dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <LuLayoutDashboard className="text-lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/employees"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaUsers className="text-lg" />
            <span>Employees</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/departments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FcDepartment className="text-lg" />
            <span>Department</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/leaves"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FcLeave className="text-lg" />
            <span>Leaves</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <IoSettings className="text-lg" />
            <span>Settings</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/salary"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <TfiMoney className="text-lg" />
            <span>Salary</span>
          </NavLink>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
