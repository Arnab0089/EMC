// import React from 'react';

// // Action Buttons Component
// export const DepartmentButtons = ({ id }) => {
//   const handleEdit = () => {
//     console.log(`Edit department with ID: ${id}`);
//   };

//   const handleDelete = () => {
//     console.log(`Delete department with ID: ${id}`);
//   };

//   return (
//     <div className="flex space-x-2">
//       <button
//         onClick={handleEdit}
//         className="w-16 h-8 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium"
//       >
//         Edit
//       </button>
//       <button
//         onClick={handleDelete}
//         className="w-16 h-8 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-medium"
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

// // Table Columns
// export const columns = [
//   {
//     name: 'Serial No',
//     selector: (row) => row.sno,
//     sortable: true,
//     width: '120px',
//   },
//   {
//     name: 'Department Name',
//     selector: (row) => row.departmentName,
//     sortable: true,
//   },
//   {
//     name: 'Description',
//     selector: (row) => row.description,
//   },
//   {
//     name: 'Actions',
//     cell: (row) => <DepartmentButtons id={row._id} />,
//     ignoreRowClick: true,
//     allowOverflow: true,
//     button: true,
//   },
// ];

// DeptHelper.js
const DeptHelper = (handleEdit, handleDelete) => [
  {
    name: 'S.No',
    selector: (row, index) => index + 1,
    width: '80px',
  },
  {
    name: 'Department Name',
    selector: (row) => row.departmentName,
    sortable: true,
  },
  {
    name: 'Description',
    selector: (row) => row.description,
    wrap: true,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  {
    name: 'Total Employees',
    selector: (row) => row.totalEmployees,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div className="flex gap-2 min-w-[120px] justify-center">
        <button
          onClick={() => handleEdit(row)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white w-[50px] py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(row._id)}
          className="bg-red-600 hover:bg-red-700 text-white w-[50px] py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowoverflow: true,

    width: '150px',
  },
];

export default DeptHelper;
