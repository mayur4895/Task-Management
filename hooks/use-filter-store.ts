// store.ts

import { GetAllTasks } from '@/components/helper/helper';
import { Task } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import {create} from 'zustand';

export type fileType = 'all' | 'pending' | 'completed'

interface TaskStore {
   
  statusFilter:fileType; 
  setStatusFilter: (status:fileType) => void;
}
 
const useFilterStore = create<TaskStore>((set) => ({ 
  
    
  statusFilter: 'all', 
  setStatusFilter: (status) => {
    set({ statusFilter: status });
  },



}));




export default useFilterStore;
