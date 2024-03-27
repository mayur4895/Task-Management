// store.ts

import { Task } from '@prisma/client';
import {create} from 'zustand';

 

interface TaskStore {
  tasks: Task[];
  statusFilter: 'all' | 'pending' | 'completed';
  setStatusFilter: (status: 'all' | 'pending' | 'completed') => void;
}

const useFilterStore = create<TaskStore>((set) => ({


  
  tasks: [], 
  statusFilter: 'all',

  setStatusFilter: (status) => {
    set({ statusFilter: status });
  },
}));

export default useFilterStore;