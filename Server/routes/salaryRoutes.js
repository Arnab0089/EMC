import express from 'express';
import { addSalary, getAllSalaries } from '../controllers/salaryController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/add', adminMiddleware, addSalary);
router.get('/all', adminMiddleware, getAllSalaries);

export default router;
