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
     console.log("deleted successfully");
     
  } catch (error) {
    console.log(error);
    
  } 
};
