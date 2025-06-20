import axios from 'axios';
export const fetchDepartment = async () => {
  let departments;
  try {
    const response = await axios.get(
      'http://localhost:8000/api/departments/all',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    console.log('Fetched departments:', response.data);

    if (response.data.success) {
      departments = response.data.data;
    }
  } catch (error) {
    console.error('Failed to fetch department:', error);
    throw error;
  }
  return departments;
};

export const getEmployee = async (id) => {
  let employee;
  try {
    const response = await axios.get(
      `http://localhost:8000/api/employees/departments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    if (response.data.success) {
      employee = response.data.data;
    }
  } catch (error) {
    console.error('Failed to fetch employee:', error);
    throw error;
  }
  return employee;
};
