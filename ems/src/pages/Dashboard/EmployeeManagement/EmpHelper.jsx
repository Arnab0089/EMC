// src/components/Employee/EmpHelper.js

const EmployeeHelper = (handleEdit, handleDelete, handleView) => [
  {
    name: 'S.No',
    selector: (row, index) => index + 1,
    width: '80px',
    cell: (row, index) => <div className="w-full text-center">{index + 1}</div>,
  },
  {
    name: 'Profile Picture',
    cell: (row) => (
      <div className="w-full flex justify-center">
        <img
          src={
            row.userId?.profileImage
              ? `http://localhost:8000/uploads/${row.userId.profileImage}`
              : '/default-avatar.png'
          }
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
        />
      </div>
    ),
    width: '100px',
  },
  {
    name: 'Full Name',
    cell: (row) => (
      <div className="text-center font-medium">{row.fullName}</div>
    ),
    sortable: true,
  },
  {
    name: 'Email',
    cell: (row) => (
      <div className="text-blue-600 text-center truncate max-w-full">
        {row.email}
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Employee ID',
    cell: (row) => (
      <div className="text-red-700 font-semibold text-center">
        {row.employeeId}
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Date of Birth',
    cell: (row) => (
      <div className="text-center">
        {row.dob ? new Date(row.dob).toLocaleDateString('en-IN') : 'N/A'}
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div className="flex gap-2 justify-center">
        <button
          className="px-3 py-1 h-8 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={() => handleEdit(row)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 h-8 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={() => handleDelete(row)}
        >
          Delete
        </button>
        <button
          className="px-3 py-1 h-8 text-sm font-medium bg-gray-500 hover:bg-gray-600 text-white rounded"
          onClick={() => handleView(row)}
        >
          View
        </button>
      </div>
    ),

    width: '220px',
  },
];

export default EmployeeHelper;
