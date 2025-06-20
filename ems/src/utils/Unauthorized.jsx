// /pages/Unauthorized.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen text-white bg-red-900">
            <h1 className="text-3xl mb-4">403 - Unauthorized</h1>
            <button
                className="bg-white text-red-900 px-6 py-2 rounded-lg font-semibold"
                onClick={() => navigate('/login')}
            >
                Go to Login
            </button>
        </div>
    );
}
