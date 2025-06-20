import express from 'express';
import adminMiddleware from '../middleware/adminMiddleware.js';
import {
  addDepartment,
  deleteDept,
  getDeptbyId,
  getDeptCount,
  getMyDepartments,
  updateDept,
} from '../controllers/departmentControl.js';

const router = express.Router();

router.get('/count', adminMiddleware, getDeptCount);
router.post('/add', adminMiddleware, addDepartment);
router.get('/all', adminMiddleware, getMyDepartments);
router.get('/:id', adminMiddleware, getDeptbyId);
router.put('/update/:id', adminMiddleware, updateDept);
router.delete('/delete/:id', adminMiddleware, deleteDept);

export default router;
