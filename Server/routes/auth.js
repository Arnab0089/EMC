import express from 'express';
import { login, signup,verify } from '../controllers/authControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/login',login)
router.post('/signup',signup)
router.get('/verifyuser',authMiddleware,verify)


export default router;