import Dept from '../models/Department.js';

// Add a new department
const addDepartment = async (req, res) => {
  try {
    const { departmentName, description } = req.body;

    const newDepartment = new Dept({
      departmentName,
      description,
      createdBy: req.user._id,
    });

    await newDepartment.save();

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: newDepartment,
    });
  } catch (err) {
    console.error('Error in addDepartment:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Get departments created by current user with totalEmployees
const getMyDepartments = async (req, res) => {
  try {
    const departments = await Dept.find({ createdBy: req.user._id }).populate(
      'employees',
    );

    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (err) {
    console.error('Error in getMyDepartments:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Get department by ID with totalEmployees
const getDeptbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Dept.findById(id).populate('employees');

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found',
      });
    }

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (err) {
    console.error('Error in getDeptbyId:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Update a department
const updateDept = async (req, res) => {
  const { id } = req.params;
  const { departmentName, description } = req.body;

  try {
    const updatedDepartment = await Dept.findByIdAndUpdate(
      id,
      { departmentName, description },
      { new: true },
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        message: 'Department not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      data: updatedDepartment,
    });
  } catch (err) {
    console.error('Error in updateDept:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Delete a department
const deleteDept = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDepartment = await Dept.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({
        success: false,
        message: 'Department not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully',
    });
  } catch (err) {
    console.error('Error in deleteDept:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

const getDeptCount = async (req, res) => {
  try {
    const count = await Dept.countDocuments({ createdBy: req.user._id });
    res.status(200).json({
      success: true,
      count,
    });
  } catch (err) {
    console.error('Error in getDeptCount:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

export {
  addDepartment,
  getMyDepartments,
  getDeptbyId,
  updateDept,
  deleteDept,
  getDeptCount,
};
