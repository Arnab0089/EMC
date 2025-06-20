import React, { useState } from 'react';
import CreateTask from '../../../component/Others/CreateTask';
import TaskList from '../../../component/TaskList/TaskList';



export default function AdminTaskDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <CreateTask onTaskCreated={() => setRefreshKey(old => old + 1)} />
      <TaskList key={refreshKey} />
    </div>
  );
}
