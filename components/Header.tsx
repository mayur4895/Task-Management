import React from 'react'
import AddButton from './AddButton'

const Header = () => {
  return (
    <div className='border rounded-md p-5 mb-5 bg-zinc-100 dark:bg-zinc-900 flex justify-between'> 
    <h3>Create Task</h3>
    <AddButton/>
    </div>
  )
}

export default Header