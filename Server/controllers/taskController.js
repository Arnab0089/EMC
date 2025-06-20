// controllers/taskController.js
import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const { title, description, date, assignedTo, category, priority } = req.body;

  try {
    const newTask = await Task.create({
      title,
      description,
      date,
      assignedTo,
      category,
      priority,
      createdBy: req.user._id, // req.user is from auth middleware
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error in createTask:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};


export const getAdminTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

