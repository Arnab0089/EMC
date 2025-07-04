import Salary from '../models/Salary.js';
import Employee from '../models/EmployeeModel.js';

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;

    if (!employeeId || !basicSalary || !payDate) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing fields' });
    }

    // Step 1: Add salary record
    const salary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      payDate,
    });

    await salary.save();

    // Step 2: Update Employee base salary (optional business logic)
    const totalSalary =
      Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

    await Employee.findByIdAndUpdate(employeeId, {
      salary: totalSalary,
      updatedAt: Date.now(),
    });

    return res.status(201).json({
      success: true,
      message: 'Salary added and employee updated',
      data: salary,
    });
  } catch (err) {
    console.error('Error in addSalary:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

const getAllSalaries = async (req, res) => {
  try {
    // Get all salaries and populate employee and department
    const salaries = await Salary.find()
      .populate({
        path: 'employeeId',
        populate: { path: 'department', select: 'departmentName' },
      })
      .lean(); // use lean to get plain JS objects

    // Filter to include only those where employee was created by the current admin
    const filtered = salaries.filter(
      (sal) =>
        sal.employeeId &&
        sal.employeeId.createdBy?.toString() === req.user._id.toString(),
    );

    return res.status(200).json({ success: true, data: filtered });
  } catch (err) {
    console.error('Error in getAllSalaries:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { addSalary, getAllSalaries };
