
import express from 'express';
import { createTask, getAdminTasks } from '../controllers/taskController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/create', adminMiddleware, createTask);
router.get('/all', adminMiddleware,getAdminTasks)

export default router;
