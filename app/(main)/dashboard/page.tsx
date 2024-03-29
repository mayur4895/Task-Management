import Header from '@/components/Header' 
import Tasks from '@/components/Tasks'
 
import React from 'react'

const Dashboard = () => {
  return (
    <div className=' w-[clac(100%-285px)] flex-1  h-full    rounded-md      '> 
       
        <Tasks/> 
    </div>
  )
}

export default Dashboard