"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Toggle } from "@/components/ui/toggle";
import axios from "axios";
import { PiCircleNotchLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { Task } from "@prisma/client";
import { Label } from "./ui/label";
import { useModal } from "@/hooks/use-modal-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";  
import { DeleteTask, GetAllTasks } from "./helper/helper";
import { TbLoader } from "react-icons/tb";
import Image from "next/image";
import TaskCard from "./task";
import useFilterStore, { fileType } from "@/hooks/use-filter-store";
import { Separator } from "./ui/separator";



const SelectItems = [
  {
     name:"All",
     value:"all"
  },
  {
    name:"Pending",
    value:"pending"
 },
 {
  name:"InProgress",
  value:"inprogress"
},
 {
  name:"Completed",
  value:"completed"
},
{
  name:"Delployed",
  value:"deployed"
},
{
  name:"Deffered",
  value:"deffered"
} 
]








const Tasks = () => {
  
  const router = useRouter();  
  const queryClient = useQueryClient();
   
const {setStatusFilter,statusFilter,setTasks,tasks} = useFilterStore();

  const {data:Tasks,isLoading:IsLoading} = useQuery({ queryKey: ['tasks'], queryFn: GetAllTasks })
 
  const { onOpen } = useModal();  

        if(IsLoading) {
return (<div className="h-[80vh] w-full flex items-center   justify-center">
   <TbLoader size={30} className="  animate-spin"/>
          </div>
       ) }
      
  
   if(!Tasks || Tasks.length === 0)  { return(<div className="h-[80vh] w-full flex items-center   justify-center">
           <div className="flex flex-col gap-3   items-center">
            <Image  src={"/empty-box.png"} alt="empty" height={280} width={280} className=" opacity-25 object-cover"/>
           <div className="flex flex-col gap-3">
           <span className=" text-rose-500">There is no Task Found</span>
            <Button variant={"outline"} onClick={()=>{onOpen('createTask')}}>Create New Task</Button>
            </div>
            </div>
      </div>
    )
}
 
 
   
   const filtered = Tasks.filter((task: any) => {
    return  statusFilter === 'all' || task.status === statusFilter;
    
  }); 

  

  return (
    <>  
    <Select  onValueChange={(value:fileType)=>{setStatusFilter(value)}}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="All" />
  </SelectTrigger>
  <SelectContent> 
    {
      SelectItems.map((item:any)=>{
        return <SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>
      })
    }
  </SelectContent>
</Select>
<br />
<Separator/>
<br />
     
    <div className="rounded-md  mb-5  w-full    h-full justify-start flex-shrink-0 flex flex-wrap gap-5 ">
        
  {
        !filtered && (
          
          <div className="h-[80vh] w-full flex items-center   justify-center">
               <div className="flex flex-col gap-3   items-center">
                <Image  src={"/empty-box.png"} alt="empty" height={280} width={280} className=" opacity-25 object-cover"/>
               <div className="flex flex-col gap-3">
               <span className=" text-rose-500">There is no Task Found</span>
                <Button variant={"outline"} onClick={()=>{onOpen('createTask')}}>Create New Task</Button>
                </div>
                </div>
          </div>
        )
      }
    
      {filtered.map((task:any) => {
        if (task) {
          return ( 
            <TaskCard
            key={task.id}
            taskdata={task}
            />
          );
        }
      })}

    </div>
    </>
  );
};

export default Tasks;





