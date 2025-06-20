import express from 'express';
import adminMiddleware from '../middleware/adminMiddleware.js';
import {
  addEmployee,
  getallEmployees,
  upload,
  getEmployeebyId,
  updateEmployee,
  deleteEmployee,
  getEmployeeCount,
  getEmployeeByDepID,
} from '../controllers/employeeControl.js';

const router = express.Router();
router.get('/count', adminMiddleware, getEmployeeCount);
router.post(
  '/add',
  adminMiddleware,
  upload.single('profilePicture'),
  addEmployee,
);
router.get('/all', adminMiddleware, getallEmployees);
router.get('/:id', adminMiddleware, getEmployeebyId);
router.put(
  '/update/:id',
  adminMiddleware,
  upload.single('profilePicture'),
  updateEmployee, // ✅ Use the correct function here
);
router.delete('/delete/:id', adminMiddleware, deleteEmployee);
router.get('/departments/:id', adminMiddleware, getEmployeeByDepID);

// router.get('/:id', adminMiddleware, getDeptbyId);
// router.put('/update/:id', adminMiddleware, updateDept);
// router.delete('/delete/:id', adminMiddleware, deleteDept);

export default router;
