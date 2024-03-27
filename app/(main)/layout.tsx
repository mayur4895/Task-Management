'use client'


import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const Mainlayout = ({children}:{children:React.ReactNode}) => {
  return (
  <div >
       <div className="  w-[250px]  m-5  fixed z-30 flex-col  inset-y-0 f-full"> 
    <Sidebar/>
    </div>
 
   <main className='m-5  h-full  z-30 flex-col inset-y-0 pl-[40px]  md:pl-[275px]'>
   <Header/>
   {children}
   </main>
   
 
  </div>
    
   
  )
}

export default Mainlayout