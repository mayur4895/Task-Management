'use client'
import { addDays, format } from "date-fns"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
 import axios from "axios"  
import {  useRouter } from "next/navigation"
 
import {  CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useModal } from "@/hooks/use-modal-store"
import { Calendar } from "../ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
 
 


const formSchema = z.object({
    title: z.string().min(1,{
      message:"required"
    }).max(20,{
        message:"max is 20"
    }),
    desc: z
    .string()
    .min(1, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
 
      assignto:z.string().min(1,{
        message:"required"
      }),
      
      priority: z.string({ required_error: "Give at least one" }),
      status: z.string({ required_error: "Give at least one" }),
      
})
const InitialModal = ()=>{
 const { isOpen,type ,onOpen ,onClose} = useModal();
 const isModalOpen = isOpen && type== "createTask";
 const router = useRouter();
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        desc:"",
        title:"",
        priority:"",
        status:"",
        assignto:""
    
    },
  })

  const isloding = form.formState.isSubmitting;
   async function onSubmit(values: z.infer<typeof formSchema>) {
      
   try {
  console.log(values);
  
    
   await axios.post("/api/task",values );
     form.reset();
     router.refresh();
     window.location.reload();
   } catch (error) {
     console.log(error);  
   }
  }

 const handleChnage =()=>{
  form.reset();
   onClose();
 }
 
    return(<>
    <Dialog open={isModalOpen} onOpenChange={handleChnage} >
  <DialogContent className=" outline-none">
    <DialogHeader>
      <DialogTitle className="text-2xl">Create your own Server</DialogTitle>
      <DialogDescription>
        You can change the server image and name of server.
      </DialogDescription>
    </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Title" {...field} />
              </FormControl>  
            </FormItem>
          )}
        />

        <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                    <Textarea
                  placeholder="Task Description"
                  className="resize-none"
                  {...field}
                />
                    </FormControl> 
                    </FormItem>
                )}
                />

<FormField
                control={form.control}
                name="assignto"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>AssignTo</FormLabel>
                    <FormControl>
                        <Input   placeholder="Enter Name" {...field} />
                    </FormControl> 
                    </FormItem>
                )}
                />
<FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="p0">p0</SelectItem>
                  <SelectItem value="p1">p1</SelectItem>
                  <SelectItem value="p2">p2</SelectItem>
                </SelectContent>
              </Select> 
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button type="submit">{isloding ? "Creating":"Create new"}</Button>
      </form>
    </Form>
 
  </DialogContent>
 
</Dialog>

    </>) 
}


export default InitialModal;