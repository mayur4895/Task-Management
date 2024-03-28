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


import { zodResolver } from "@hookform/resolvers/zod"
 
import { useForm } from "react-hook-form"
import { z } from "zod"
   
import { useRouter } from "next/navigation";
 
import { useModal } from "@/hooks/use-modal-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";  
import { DeleteTask, GetAllTasks } from "./helper/helper";
import { TbLoader } from "react-icons/tb";
import Image from "next/image";
import TaskCard from "./task";
import useFilterStore, { statusType, prioritiesType } from "@/hooks/use-filter-store";
import { Separator } from "./ui/separator";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./date-range";



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



const Priorities = [
  {
    name:"All",
    value:"all"
 },
  {
     name:"p0",
     value:"p0"
  },
  {
    name:"p1",
    value:"p1"
 },
 {
  name:"p2",
  value:"p2"
},
   
]




const FormSchema = z.object({
  dob: z.date({
    required_error: "Filtered date is required.",
  }),
})


const Tasks = () => {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  
  const router = useRouter();  
  const queryClient = useQueryClient();
   
const {setStatusFilter,statusFilter , dateFilter,setDateFilter, setpriorityFilter,priorityFilter} = useFilterStore();

  const {data:Tasks,isLoading:IsLoading} = useQuery({ queryKey: ['tasks'], queryFn: GetAllTasks })
  
 
  const { onOpen } = useModal();  

        if(IsLoading) {
return (<div className="h-[80vh] w-full flex items-center   justify-center">
   <TbLoader size={30} className="  animate-spin"/>
          </div>
       ) }
      
  
       
   
       const filterstatus = Tasks.filter((task: any) => {
     return statusFilter === 'all' || task.status === statusFilter;
    
  }); 
  
  const filterPriority = filterstatus.filter((task: any) => {
    return  priorityFilter === 'all' || task.priority === priorityFilter;
    
  }); 

  const filterTasks = filterPriority.filter((task: any) => {
    console.log(dateFilter);
    const extractedDate = task.createdAt.substring(0, 10);

// Create a new Date object from the extracted date
const convertedDate = new Date(extractedDate);

const taskDate = new Date(convertedDate); 
if(dateFilter?.from && dateFilter?.to )
return taskDate >= dateFilter.from && taskDate <= dateFilter?.to; 
  }); 

 
 



  

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
 

  return (
    <>
      <div className="flex  items-center gap-4 flex-wrap">
      <div>
 <h3 className="text-sm mb-4">Filter By Staus</h3>
      <Select  onValueChange={(value:statusType)=>{setStatusFilter(value)}}>
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
</div>

<div>
 <h3 className="text-sm mb-4">Filter By Priorities</h3>
      <Select  onValueChange={(value:prioritiesType)=>{setpriorityFilter(value)}}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="All" />
  </SelectTrigger>
  <SelectContent> 
    {
       Priorities.map((priorty:any)=>{
        return <SelectItem key={priorty.value} value={priorty.value}>{priorty.name}</SelectItem>
      })
    }
  </SelectContent>
</Select>
</div> 

 <div>
  
 <h3 className="text-sm mb-4">Filter By Date</h3>
 <DatePickerWithRange/>
 
 </div>
</div>
<br />
<Separator/>
<br />
     
    <div className="rounded-md  mb-5  w-full  justify-center   h-full md:justify-start flex-shrink-0 flex flex-wrap gap-5 ">
        
  {
        !filterTasks && (
          
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
    
      {filterTasks.map((task:any) => {
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









 
  