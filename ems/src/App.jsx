import React, { useEffect } from 'react';
import { Login } from './component/Auth/Login';
import './index.css';
import EmployeeDashboard from './component/Dashboard/EmployeeDashboard';
import { AdminDashboard } from './component/Dashboard/AdminDashboard';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import SignUp from './component/Auth/SignUp';
import PrivateRoutes from './utils/PrivateRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Home from './pages/Home';
import Unauthorized from './utils/Unauthorized';
import AdminSummary from './pages/Dashboard/AdminSummary';
import EmployeesList from './pages/Employees/employeesList';
import AdminTaskDashboard from './pages/Dashboard/TaskDashboard/AdminTaskDashboard';
import DepartmentList from './pages/Dashboard/Departments/DepartmentList';
import AddDepartment from './pages/Dashboard/Departments/AddDepartment';
import EditDepartment from './pages/Dashboard/Departments/EditDepartment';
import List from './pages/Dashboard/EmployeeManagement/List';
import Add from './pages/Dashboard/EmployeeManagement/Add';
import ViewEmployee from './pages/Dashboard/EmployeeManagement/ViewEmployee';
import EditEmp from './pages/Dashboard/EmployeeManagement/EditEmp';
import ListOfSalary from './pages/Dashboard/Salary/ListOfSalary';
import SalaryForum from './pages/Dashboard/Salary/SalaryForum';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <ProtectedRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </ProtectedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route
            path="/admin-dashboard/employees/add"
            element={<Add />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/view/:id"
            element={<ViewEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/update/:id"
            element={<EditEmp />}
          ></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/departments/add"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/departments/edit/:id"
            element={<EditDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/salary"
            element={<ListOfSalary />}
          ></Route>
          <Route
            path="/admin-dashboard/salary/add"
            element={<SalaryForum />}
          ></Route>
        </Route>
        <Route path="/create-task" element={<AdminTaskDashboard />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

// App.jsx
// import React from 'react'
// import { BrowserRouter as Router } from 'react-router-dom'
// import AppRoutes from './AppRoutes'

// export default function App() {
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   )
// }
