import axios from 'axios';
import React, { useContext, createContext, useState, useEffect } from 'react';
import { API_BASE_URL as API } from '../url';

const userContext = createContext();
export default function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${API}/api/auth/verifyuser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('User verification response:', response);
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('Error verifying user:', error);
        if (error.response && error.response.data.message) {
          console.error('Error verifying user:', error.response.data.message);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <userContext.Provider value={{ user, login, logOut, loading }}>
      {children}
    </userContext.Provider>
  );
}

export const useAuth = () => useContext(userContext);
