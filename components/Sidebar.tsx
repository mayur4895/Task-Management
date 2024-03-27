'use client'
import { UserButton} from '@clerk/nextjs'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { HiMenuAlt4 } from "react-icons/hi";
import React from 'react'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'
import { TbMenu } from "react-icons/tb";
 
 
const Sidebar = () => {
    
  return (
    <>
    <div className=' md:w-[250px] hidden md:flex  flex-col flex-1  h-full        border  rounded-md    dark:bg-zinc-900 px-2 py-5'> 
    
    <div className='w-full flex gap-2 items-center justify-between'>
      
        <div  className='flex items-center gap-1'>
        <UserButton/> 
        </div>
        <ModeToggle/>
    </div>

    <div className='mt-20  flex flex-col gap-5  p-0 w-full'>

       <Link href={"/dashboard/tasks"} className=' p-2  w-full '>Tasks</Link>  
<Link href={"/dashboard/completed"} className=' p-2  w-full '>Completed</Link> 
<Link href={"/dashboard/Important"} className=' p-2  w-full '>important</Link>  
<Link href={"/dashboard/pending"} className=' p-2  w-full '>Pending</Link>

    
    </div>
        
    </div>

<Sheet >
<SheetTrigger className=' md:hidden fixed top-6 left-0 m-5'><TbMenu  size={25}/></SheetTrigger>
<SheetContent side={"left"}>
  <SheetHeader>
    <SheetTitle> 
    <div className='w-full flex gap-5 items-center '>
      
      <div  className='flex items-center gap-1'>
      <UserButton/>
      <span>Mayur Shinde</span>
      </div>
      <ModeToggle/>
  </div>
    </SheetTitle> 
  </SheetHeader>
  
  <div className='mt-20  flex flex-col gap-5  p-0 w-full'>

<Link href={"/dashboard/tasks"} className=' p-2  w-full '>Tasks</Link>  
<Link href={"/dashboard/completed"} className=' p-2  w-full '>Completed</Link> 
<Link href={"/dashboard/Important"} className=' p-2  w-full '>important</Link>  
<Link href={"/dashboard/pending"} className=' p-2  w-full '>Pending</Link>

</div>
</SheetContent>
</Sheet>
 </>
  )
}

export default Sidebar