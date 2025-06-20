// const departmentTableStyles = {
//   table: {
//     style: {
//       width: '100%',
//     },
//   },
//   header: {
//     style: {
//       backgroundColor: 'var(--color-medium-dark-bg)',
//       color: '#ffffff',
//       fontSize: '18px',
//       fontWeight: 'bold',
//       padding: '16px',
//     },
//   },
//   headRow: {
//     style: {
//       backgroundColor: 'var(--color-medium-bg)',
//       borderBottomWidth: '1px',
//       borderBottomColor: '#ccc',
//     },
//   },
//   headCells: {
//     style: {
//       color: '#ffffff',
//       fontSize: '14px',
//       fontWeight: 600,
//       textTransform: 'capitalize',
//       paddingTop: '12px',
//       paddingBottom: '12px',
//     },
//   },
//   rows: {
//     style: {
//       backgroundColor: 'var(--color-light-bg)',
//       color: '#1B1A55',
//       fontSize: '14px',
//       minHeight: '48px',
//     },
//     stripedStyle: {
//       backgroundColor: '#e6e6f5', // lighter tone for stripe effect
//     },
//     highlightOnHoverStyle: {
//       backgroundColor: '#f1f1ff',
//       borderBottomColor: '#aaaaaa',
//       borderRadius: '0',
//       outline: '1px solid #ddd',
//     },
//   },
//   pagination: {
//     style: {
//       backgroundColor: 'var(--color-medium-dark-bg)',
//       color: '#ffffff',
//       borderTop: '1px solid #444',
//       padding: '12px',
//     },
//     pageButtonsStyle: {
//       color: '#ffffff',
//       fill: '#ffffff',
//       '&:hover': {
//         backgroundColor: '#555',
//       },
//       '&:disabled': {
//         cursor: 'not-allowed',
//         color: '#999',
//       },
//     },
//   },
// };

// export default departmentTableStyles;

// DepartmentStyle.js
// const departmentTableStyles = {
//   header: {
//     style: {
//       backgroundColor: '#535C91',
//       color: 'white',
//     },
//   },
//   headRow: {
//     style: {
//       backgroundColor: '#535C91',
//       color: 'white',
//       fontSize: '16px',
//     },
//   },
//   headCells: {
//     style: {
//       color: 'white',
//     },
//   },
//   rows: {
//     style: {
//       backgroundColor: '#9290C3',
//       color: '#1B1A55',
//     },
//   },
//   pagination: {
//     style: {
//       backgroundColor: '#1B1A55',
//       color: 'white',
//     },
//     pageButtonsStyle: {
//       fill: 'white',
//       '&:disabled': {
//         fill: '#555',
//       },
//     },
//   },
// };

// export default departmentTableStyles;

const departmentTableStyles = {
  headRow: {
    style: {
      backgroundColor: '#535C91',
      color: 'white',
      fontSize: '16px',
      display: 'grid',
      gridTemplateColumns: '80px 2fr 3fr 1fr 150px',
    },
  },
  headCells: {
    style: {
      border: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px',
      fontWeight: 'bold',
    },
  },
  rows: {
    style: {
      backgroundColor: '#9290C3',
      color: '#1B1A55',
      display: 'grid',
      gridTemplateColumns: '80px 2fr 3fr  1fr 150px',
    },
  },
  cells: {
    style: {
      border: '1px solid #ddd',
      padding: '8px',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      textAlign: 'center',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#1B1A55',
      color: 'white',
    },
    pageButtonsStyle: {
      fill: 'white',
      '&:disabled': {
        fill: '#555',
      },
    },
  },
};

export default departmentTableStyles;
