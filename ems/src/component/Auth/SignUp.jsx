import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]         = useState('user');
  const [profileImage, setProfileImage] = useState('');
  const [message, setMessage] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { username, email, password, role, profileImage };

    try {
      const res = await axios.post('http://localhost:8000/api/auth/signup', formData);
      setMessage(res.data.message);
        setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-medium-dark-bg">
      <form onSubmit={handleSubmit} className="bg-light-bg p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-medium-bg p-2 rounded bg-white text-medium-dark-bg "
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-medium-bg p-2 rounded bg-white text-medium-dark-bg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border  border-medium-bg p-2 rounded bg-white text-medium-dark-bg"
        />

        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border  border-medium-bg p-2 rounded bg-white text-medium-dark-bg"
        >
          <option value="user">User</option>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL (optional)"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          className="w-full border  border-medium-bg p-2 rounded bg-white text-medium-dark-bg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
        

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default SignUp;
