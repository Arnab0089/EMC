import React from 'react';
import Header from '../Common/Header';
import CreateTask from '../Others/CreateTask';
import AllTask from '../Others/AllTask';
import { useAuth } from '../../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../pages/Dashboard/AdminSidebar';
import AdminSummary from '../../pages/Dashboard/AdminSummary';

export const AdminDashboard = () => {
  return (
    <>
      <div>
        <Header />
        <div className="lg:flex ">
          <AdminSidebar />
          <div className="flex-1 p-4  min-h-screen">
            <Outlet />
            {/* <CreateTask />
          <AllTask /> */}
          </div>
        </div>
      </div>
    </>
  );
};
