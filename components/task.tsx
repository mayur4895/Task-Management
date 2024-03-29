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
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import AlertDilog from "./modal/alert-modal";

interface TaskCardProps {
  taskdata: any;
}

const ColorMap: any = {
  pending: "bg-gray-100  dark:bg-gray-500/20",
  completed: "bg-green-100  dark:bg-green-500/20",
  inprogress: " bg-blue-100  dark:bg-blue-500/20",
  deployed: "dark:bg-cyan-500/20  bg-cyan-100 ",
  deferred: " bg-orange-100 dark:bg-orange-500/20",
};

const TaskCard = ({ taskdata: task }: TaskCardProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: Tasks, isLoading: IsLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: GetAllTasks,
  });

  const mutation = useMutation({
    mutationFn: DeleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { onOpen } = useModal();

  const extractedDate = task.createdAt.substring(0, 10);

  const convertedDate = new Date(extractedDate);

  const newdate = convertedDate.toUTCString().split(" ").slice(0, 4).join("");

  const [Open, setOpen] = useState(false);
  return (
    
    <>
       <div>
        
        <div >
        <AlertDilog
        isOpen={Open}
        
        title="Are You Sure?"
        description="Are you sure you want to delete this task?"
        onConfirm={() => {
          mutation.mutate(task.id);
        }}
        Isloading={IsLoading}
        onClose={() => {
          setOpen(false);
        }}
      />
        </div>
      <Card
        className={cn(
          "w-[310px] relative flex flex-col justify-between   overflow-clip p-5 z-50  ",
          ColorMap[task.status]
        )}
        key={task.id}>
        <CardHeader className="p-0 mb-2">
          <CardTitle className="flex  text-xl text-black dark:text-white  justify-between items-center">
            {task.title}{" "}
            <Label className="text-xs  text-black dark:text-white">
              {task.priority}
            </Label>
          </CardTitle>
          <CardDescription className=" text-stone-700 dark:text-gray-200  text-sm max-w-[280px]">
            {task.desc}
          </CardDescription>
          <Separator className=" bg-gray-500/15" />
          <h2 className="text-zinc-800 dark:text-gray-200 mt-2">
            Assignto : <span className="font-medium">{task.assignto}</span>
          </h2>
        </CardHeader>

        <CardFooter className="flex gap-3 p-0 pb-5  ">
          <Button
            variant="outline"
            className="  bg-green-600  text-white hover:text-white  hover:bg-green-700 "
            onClick={() => {
              onOpen("editTask", task);
            }}>
            <CiEdit size={20} />
          </Button>

          <Button
            variant="outline"
            className="  bg-red-500  text-white hover:text-white  hover:bg-red-600 "
            disabled={task.status === "completed"}
            onClick={() => {
              setOpen(true);
            }}>
            <PiTrashSimpleThin size={20} />
          </Button>

          <div>
            <Button
              variant={"outline"}
              className={cn(
                " pointer-events-none text-sm",
                ColorMap[task.status]
              )}>
              {task.status}
            </Button>
          </div>
        </CardFooter>
        <div className=" absolute bottom-1 right-3">
          <span className="text-xs text-gray-800  dark:text-gray-300 font-semibold">
            {" "}
            createdAt : {newdate}
          </span>
        </div>
      </Card>
      </div>


      
    </>
  );
};

export default TaskCard;
