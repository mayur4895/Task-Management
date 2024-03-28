// store.ts

import { GetAllTasks } from '@/components/helper/helper';
import { Priorities, Task } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { addDays, addMonths, startOfMonth } from 'date-fns';
import { DateRange } from 'react-day-picker';
import {create} from 'zustand';

export type statusType = 'all' | 'pending' | 'completed'
export type prioritiesType =  'p0' | 'p1' | 'p2' | 'all';
interface TaskStore {
  priorityFilter:prioritiesType;
  statusFilter:statusType; 
  dateFilter: DateRange  ;
  setpriorityFilter: (priority:prioritiesType) => void;
  setStatusFilter: (status:statusType) => void;
  setDateFilter: (date:DateRange) => void;
}
const currentDate = new Date();

const nextMonthDate = addMonths(currentDate, 1);
const useFilterStore = create<TaskStore>((set) => ({ 
  
  priorityFilter:'all',  
  statusFilter: 'all', 
  // dateFilter: {
  //   from: startOfMonth ,
  //   to:next
  //   //to: addDays(new Date(2024, 0, 20), 20),
  // },
  dateFilter: {
    from: startOfMonth(currentDate), // Current month's start date
    to: startOfMonth(nextMonthDate), // Next month's start date
  },
  setStatusFilter: (status) => {
    set({ statusFilter: status });
  },
  
  setpriorityFilter: (priority) => {
    set({ priorityFilter: priority });
  },

  setDateFilter: (date: DateRange) => {
    set({ dateFilter: date});
  },
  
   

}));




export default useFilterStore;
