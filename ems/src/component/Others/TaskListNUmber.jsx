import React from 'react'

export default function TaskListNUmber() {
  return (
    <div className='flex screen md:flex-row flex-col items-center justify-between mt-10 p-4  gap-5'>
      <div className='w-[45%] py-5 px-10 bg-amber-300 border-2 border-medium-bg shadow-lg rounded-b-2xl'>
        <h2 className='text-2xl font-semibold text-medium-dark-bg'>0</h2>
        <h3 className='text-xl font-medium text-medium-dark-bg'>New Task</h3>
      </div>
      <div className='w-[45%] py-5 px-10 bg-blue-300 border-2 border-medium-bg shadow-lg rounded-b-2xl'>
        <h2 className='text-2xl font-semibold text-medium-dark-bg'>0</h2>
        <h3 className='text-xl font-medium text-medium-dark-bg'>Accepted Task</h3>
      </div>
      <div className='w-[45%] py-5 px-10 bg-green-400 border-2 border-medium-bg shadow-lg rounded-b-2xl'>
        <h2 className='text-2xl font-semibold text-medium-dark-bg'>0</h2>
        <h3 className='text-xl font-medium text-medium-dark-bg'>Completed Task</h3>
      </div>
      <div className='w-[45%] py-5 px-10 bg-red-400 border-2 border-medium-bg shadow-lg rounded-b-2xl'>
        <h2 className='text-2xl font-semibold text-medium-dark-bg'>0</h2>
        <h3 className='text-xl font-medium text-medium-dark-bg'>Failed Task</h3>
      </div>
    </div>
  )
}
