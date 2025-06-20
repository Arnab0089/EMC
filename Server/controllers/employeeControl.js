import path from 'path';
import Employee from '../models/EmployeeModel.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import Dept from '../models/Department.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

const addEmployee = async (req, res) => {
  try {
    const {
      fullName,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      phoneNumber,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    // Check if employeeId already exists
    const existingEmpId = await Employee.findOne({ employeeId });
    if (existingEmpId) {
      return res.status(409).json({
        success: false,
        message: 'Employee ID already exists',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: fullName,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : '',
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      fullName,
      email,
      dob,
      gender,
      maritalStatus,
      phoneNumber,
      department,
      salary,
    });

    await newEmployee.save();

    return res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      data: newEmployee,
    });
  } catch (err) {
    console.error('Error in addEmployee:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

const getallEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('userId', 'username email profileImage')
      .populate('department', 'departmentName');
    return res.status(200).json({
      success: true,
      message: 'Employees fetched successfully',
      data: employees,
    });
  } catch (err) {
    console.error('Error in getallEmployees:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

const getEmployeebyId = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id)
      .populate('userId', 'username email profileImage')
      .populate('department', 'departmentName');
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Employee fetched successfully',
      data: employee,
    });
  } catch (err) {
    console.error('Error in getEmployeebyId:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, maritalStatus, phoneNumber, department, salary } =
      req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Associated user not found',
      });
    }

    // Update user (name + profile image)
    const updatedUser = await User.findByIdAndUpdate(
      employee.userId,
      {
        username: fullName,
        profileImage: req.file ? req.file.filename : user.profileImage,
      },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: 'User update failed',
      });
    }

    // Update employee fields
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        fullName,
        maritalStatus,
        phoneNumber,
        department,
        salary,
      },
      { new: true },
    );

    if (!updatedEmployee) {
      return res.status(500).json({
        success: false,
        message: 'Employee update failed',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee,
    });
  } catch (err) {
    console.error('Error in updateEmployee:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    // Step 1: Find employee
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // Step 2: Delete associated user
    if (employee.userId) {
      const userDeleted = await User.findByIdAndDelete(employee.userId);
      console.log('Deleted User:', userDeleted);
    } else {
      console.warn('Employee found, but userId is missing or invalid');
    }

    // Step 3: Delete employee
    await Employee.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Employee and associated user deleted successfully',
    });
  } catch (err) {
    console.error('Error deleting employee/user:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

const getEmployeeCount = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (err) {
    console.error('Error in getEmployeeCount:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getEmployeeByDepID = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id });
    return res.status(200).json({
      success: true,
      message: 'Employees fetched successfully',
      data: employees,
    });
  } catch (err) {
    console.error('Error in getEmployeeByDepID:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

export {
  addEmployee,
  upload,
  getallEmployees,
  getEmployeebyId,
  updateEmployee,
  deleteEmployee,
  getEmployeeCount,
  getEmployeeByDepID,
};
