import React from 'react';
useAuth
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(); // Remove token and user info
    navigate('/login'); // Redirect to login
  };

  return (
    <div className='flex items-center justify-between p-4 pt-6 bg-medium-bg shadow-md '>
      <div className='text-2xl font-bold text-medium-dark-bg'>
        <p className='text-2xl'>
          Hello<span className='text-xl italic px-2'>{user?.username || 'User'}</span>
        </p>
      </div>
      <div className='flex items-center gap-4'>
        <button
          onClick={handleLogout}
          className='bg-red-500 hover:bg-emerald-600 transition-colors text-white font-semibold py-2 px-3 rounded-xl'
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
