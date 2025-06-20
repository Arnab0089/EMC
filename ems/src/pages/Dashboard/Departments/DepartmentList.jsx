// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import { Link } from 'react-router-dom';
// import { columns } from './DeptHelper';
// import departmentTableStyles from './DepartmentStyle';

// export default function DepartmentList() {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           'http://localhost:8000/api/departments/all',
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           },
//         );

//         if (response.data.success) {
//           let sno = 1;
//           const data = response.data.data.map((dep) => ({
//             _id: dep._id,
//             sno: sno++,
//             departmentName: dep.departmentName,
//             description: dep.description,
//           }));
//           setDepartments(data);
//         }
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Filtered list based on search
//   const filteredDepartments = departments.filter((dep) =>
//     dep.departmentName.toLowerCase().includes(searchText.toLowerCase()),
//   );

//   return (
//     <>
//       <div className="flex items-center justify-between bg-gray-800 p-4 text-white rounded-2xl border border-gray-700 shadow-md mb-6">
//         <h3 className="text-2xl font-semibold">Manage Departments</h3>
//       </div>

//       <div className="mb-4 flex flex-col lg:flex-row items-center justify-between gap-2">
//         <input
//           type="text"
//           placeholder="Search by department..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//         />

//         <Link
//           to="/admin-dashboard/departments/add"
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
//         >
//           Add Department
//         </Link>
//       </div>

//       <div className="w-full overflow-x-auto">
//         {loading ? (
//           <p className="text-center text-gray-500 py-6">
//             Loading departments...
//           </p>
//         ) : filteredDepartments.length === 0 ? (
//           <p className="text-center text-gray-500 py-6">
//             No departments found.
//           </p>
//         ) : (
//           <DataTable
//             columns={columns}
//             data={filteredDepartments}
//             customStyles={departmentTableStyles}
//             pagination
//             striped
//             highlightOnHover
//             responsive
//           />
//         )}
//       </div>
//     </>
//   );
// }

// DepartmentList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DeptHelper from './DeptHelper';
import departmentTableStyles from './DepartmentStyle';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL as API } from '../../../url';

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${API}/api/departments/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDepartments(response.data.data);
        setFilteredDepartments(response.data.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };

    fetchDepartments();
  }, []);

  // Search filtering
  useEffect(() => {
    const result = departments.filter((dept) =>
      dept.departmentName.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredDepartments(result);
  }, [search, departments]);

  // Edit handler
  const handleEdit = (row) => {
    console.log('Edit department:', row);
    // Navigate or show modal here
    console.log('Navigating to edit page for department:', row._id);
    navigate(`/admin-dashboard/departments/edit/${row._id}`);
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(
          `http://localhost:8000/api/departments/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        setDepartments(departments.filter((dep) => dep._id !== id));
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-medium-dark-bg rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 p-2 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold bg-light-bg text-medium-dark-bg px-4 py-2 rounded-lg shadow-md">
          Manage Departments
        </h2>
        <Link
          to="/admin-dashboard/departments/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Add Department
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search departments..."
        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-light-bg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataTable
        columns={DeptHelper(handleEdit, handleDelete)}
        data={filteredDepartments}
        customStyles={departmentTableStyles}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
        noDataComponent="No departments found"
      />
    </div>
  );
}
