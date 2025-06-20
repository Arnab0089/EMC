import React,{useState} from 'react'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {login} = useAuth()
    const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response=await axios.post('http://localhost:8000/api/auth/login',{email,password});
      console.log('Login successful:', response);
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem('token',response.data.token);
        if(response.data.user.role === 'admin'){
            navigate('/admin-dashboard')
        }
        else{
          navigate('/employee-dashboard')
        }
      }
    }
    catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='flex flex-col gap-8 h-screen w-screen items-center justify-center bg-medium-bg'>
       <h2 className='text-2xl sm:text-4xl font-bold text-center text-white mb-6'>Employee Management System</h2>
      <div className='w-full max-w-md p-8 bg-medium-dark-bg rounded-2xl shadow-lg'>
        <h2 className='text-3xl font-bold text-center text-white mb-6'>Log In</h2>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-white mb-1'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email'
              className='p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
                }
              }
              
              required
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-white mb-1'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Enter your password'
              className='p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
                }          
              }   
              required
            />
          </div>
          <button
            type='submit'
            className='bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-semibold py-3 rounded-xl'
          >
            Log In
          </button>
          <p className='text-center text-white mt-4'>
            Don't have an account? <a href='/signup' className='text-emerald-400 hover:underline'>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};
