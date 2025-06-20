import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoutes({children}) {
 const {user, loading} = useAuth();
    const navigate = useNavigate();

    if(loading) {
    return <div className='flex items-center justify-center h-screen text-white'>Loading...</div>;
    }

      return user ? (
            children
        ) : (
            <div className='flex flex-col items-center justify-center h-screen bg-gray-900 text-white'>
            <p className='mb-4 text-xl'>You do not have permission to access this page.</p>
            <button
                className='px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-300'
                onClick={() => navigate('/login')}
            >
                Go to Login
            </button>
            </div>
        )

}
