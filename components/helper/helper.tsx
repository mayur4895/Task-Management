 
import axios from "axios";



export const GetAllTasks = async()=>{
 
        try {
        
          const res = await axios.get("/api/task");
          return res.data;
        } catch (error) {
          console.log(error);
         
        }
 
}
 
export const DeleteTask = async (taskId: any) => {
  try { 
 
     const res = await axios.delete(`/api/task/${taskId}`);
     console.log("deleted");
     
   return res.data;
     
  } catch (error) {
    console.log(error);
    
  } 
};

 

export const EditTask = async (taskId:any,data:any) => {
  try { 
 
const res = await axios.patch( `/api/task/${taskId}`, data)
console.log("edited");

    return res.data;

     
  } catch (error) {
    console.log(error);
    
  } 
};
