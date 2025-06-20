// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRegister from './userSeed.js'; // ✅ import the seeding function
import authRouter from '../routes/auth.js'; // ✅ import auth routes
import connectToDB from '../DB/db.js'; // ✅ import DB connection
import taskRouter from '../routes/taskRoutes.js';
import departmentRouter from '../routes/departmentRoutes.js';
import employeeRouter from '../routes/employeeMangeRoutes.js'; // ✅ import employee routes
import salaryRoutes from '../routes/salaryRoutes.js';

connectToDB();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter); // ✅ use auth routes
app.use('/api/tasks', taskRouter); // ✅ use task routes
app.use('/api/departments', departmentRouter); // ✅ use department routes
app.use('/api/employees', employeeRouter); // ✅ use employee routes
app.use('/uploads', express.static('public/uploads'));
app.use('/api/salary', salaryRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to the Employee Management System API');
});
// Call user seeding logic
// userRegister(); // ✅ runs at server startup

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
