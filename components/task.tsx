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
import useFilterStore from "@/hooks/use-filter-store";
 
interface TaskCardProps{
    taskdata:any
}
const TaskCard = ({taskdata:task}:TaskCardProps) => {
  const router = useRouter();  
  const queryClient = useQueryClient();
   
  const {data:Tasks,isLoading:IsLoading} = useQuery({ queryKey: ['tasks'], queryFn: GetAllTasks })


  const mutation = useMutation({
    mutationFn:  DeleteTask,
    onSuccess: () => {
 
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  }) 
  
  
  
  const { onOpen } = useModal();

  
      

  return ( 
            <Card className="w-[310px]  overflow-clip p-5 z-50 dark:bg-zinc-900" key={task.id}>
              <CardHeader className="p-0 mb-2">
                 
                <CardTitle className="flex  justify-between items-center">
                  {task.title}{" "}
                  <Label className="text-xs   text-gray-500">
                    {task.priority}
                  </Label>
                </CardTitle>
                <CardDescription className=" text-sm max-w-[250px]">{task.desc}</CardDescription>
              </CardHeader>

              <h2>Assignto : {task.assignto}</h2>
              <CardContent />
              <CardFooter  className="flex gap-3 p-0"> 

                  <Button
                    variant="outline"
                    onClick={() => {
                      onOpen("editTask", task);
                    }}>
                    <CiEdit size={20} />
                  </Button>

                  <Button
                    variant="outline"
                    disabled={task.status === "completed"}
                    onClick={() => {
                       mutation.mutate(task.id)
                    }}>
                    <PiTrashSimpleThin size={20} />
                  </Button>
                

                <div>
                  <Button variant={"outline"} className=" text-sm">
                    {task.status}
                  </Button>

                </div>
              </CardFooter>
            </Card>
          );
        }
      
   
 

export default TaskCard;
