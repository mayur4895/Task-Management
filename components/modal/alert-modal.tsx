'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dilog"

  
  import React, { useEffect, useState } from 'react'
  


interface AlertDilogProps{
    title: string;
    description:string;
     isOpen:boolean;
     Isloading:boolean;
    onConfirm:()=>void;
    onClose:()=>void;
  }
  const AlertDilog = ({onConfirm ,onClose,description,title,Isloading,isOpen}:AlertDilogProps) => {

  const [Open,setOpen] = useState(false);
    useEffect(()=>{
        setOpen(true);
    })

    if(!Open){
        return null;
    }
    return (
      <div>
        <AlertDialog open={isOpen} onOpenChange={onClose}> 
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>
        {description}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel disabled={Isloading} onClick={()=>{onClose()}}>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-500  hover:bg-red-600" disabled={Isloading} onClick={()=>{onConfirm()}}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
  </AlertDialog> 
      </div>
    )
  }
  
  export default AlertDilog
  