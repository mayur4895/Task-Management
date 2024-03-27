"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CiEdit } from "react-icons/ci";
import {
  PiTrashSimpleThin,
  PiCheckThin,
  PiCrossThin,
  PiXThin,
} from "react-icons/pi";
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
const Tasks = () => {
  const router = useRouter();  
  const queryClient = useQueryClient();
   

  const {data:Tasks,isLoading:IsLoading} = useQuery({ queryKey: ['tasks'], queryFn: GetAllTasks })

 
 
 

  
  const { onOpen } = useModal();

 

   
        if(IsLoading ) {
return (<div className="h-[80vh] w-full flex items-center   justify-center">
   <TbLoader size={30} className="  animate-spin"/>
          </div>
       ) }
      

  return (
    <div className="rounded-md  mb-5  w-full    h-full justify-start flex-shrink-0 flex flex-wrap gap-5 ">
        
  {
        !(Tasks.length > 0) && (
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

      {Tasks.map((task:any) => {
        if (task) {
          return ( 
            <TaskCard
            taskdata={task}
            />
          );
        }
      })}
    </div>
  );
};

export default Tasks;





