// src/utils/EmployeeCount.js
import axios from 'axios';
import { API_BASE_URL as API } from '../url';

export const fetchEmployeeCount = async () => {
  try {
    const response = await axios.get(`${API}/api/employees/count`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      return response.data.count;
    } else {
      throw new Error(
        response.data.message || 'Failed to fetch employee count',
      );
    }
  } catch (error) {
    console.error('Error fetching employee count:', error);
    return 0;
  }
};

export const fetchDepartmentCount = async () => {
  try {
    const response = await axios.get(`${API}/api/departments/count`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      return response.data.count;
    } else {
      throw new Error(
        response.data.message || 'Failed to fetch department count',
      );
    }
  } catch (error) {
    console.error('Error fetching department count:', error);
    return 0;
  }
};
