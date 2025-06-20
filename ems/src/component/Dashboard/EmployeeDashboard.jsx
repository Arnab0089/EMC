import React from 'react'
import Header from '../Common/Header'
import TaskListNUmber from '../Others/TaskListNUmber'
import TaskList from '../TaskList/TaskList'

export default function EmployeeDashboard() {
  return (
    <div>
      <Header />
      <TaskListNUmber />
      <TaskList />
    </div>
  )
}
