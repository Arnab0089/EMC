import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Virtual for employee list
departmentSchema.virtual('employees', {
  ref: 'Employee',
  localField: '_id',
  foreignField: 'department',
});

// Virtual for totalEmployees count
departmentSchema.virtual('totalEmployees').get(function () {
  return this.employees?.length || 0;
});

departmentSchema.set('toObject', { virtuals: true });
departmentSchema.set('toJSON', { virtuals: true });

const Dept = mongoose.model('Department', departmentSchema);
export default Dept;
