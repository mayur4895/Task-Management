'use client'


import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const Mainlayout = ({children}:{children:React.ReactNode}) => {
  return (
  <div >
  
   <main className='m-5  h-full  z-30 flex-col inset-y-0 '>
   <Header/>
   {children}
   </main>
   
 
  </div>
    
   
  )
}

export default Mainlayout