// AppRoutes.jsx
import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Login } from './component/Auth/Login'
import SignUp from './component/Auth/SignUp'
import EmployeeDashboard from './component/Dashboard/EmployeeDashboard'
import { AdminDashboard } from './component/Dashboard/AdminDashboard'
import PrivateRoutes from './utils/privateRoutes'
import ProtectedRoutes from './utils/protectedRoutes'
import Home from './pages/Home'
import { useAuth } from './context/AuthContext'

export default function AppRoutes() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
     console.log('User:', user);
  console.log('Loading:', loading);
  console.log('Current path:', location.pathname);
    if (!loading && user && location.pathname === '/') {
      if (user.role === 'admin') {
        navigate('/admin-dashboard', { replace: true })
      } else if (user.role === 'user') {
        navigate('/employee-dashboard',{ replace: true })
      }
    }
  }, [user, loading, location.pathname, navigate])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/admin-dashboard" element={
        <PrivateRoutes>
          <ProtectedRoutes requiredRole={['admin']}>
            <AdminDashboard />
          </ProtectedRoutes>
        </PrivateRoutes>
      } />
    </Routes>
  )
}
