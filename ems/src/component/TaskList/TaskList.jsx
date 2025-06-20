import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/tasks/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      console.log(res.data);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
        Recent Task History
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tasks.slice(0, 4).map((task) => (
          <div
            key={task._id}
            className="bg-medium-bg hover:scale-[1.02] transition-transform duration-200 ease-in-out text-white rounded-xl shadow-md p-4"
          >
            <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
              <span className="bg-light-bg text-xs px-2 py-1 rounded font-medium text-white">
                {task.priority}
              </span>
              <span>{new Date(task.date).toLocaleDateString()}</span>
            </div>
            <h3 className="text-lg font-bold mb-1 text-blue-300">{task.title}</h3>
            <p className="text-sm text-gray-200">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
