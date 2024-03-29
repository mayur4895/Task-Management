 
import {  Task } from '@prisma/client'; 
import {   addMonths, startOfMonth } from 'date-fns';
import { DateRange } from 'react-day-picker';
import {create} from 'zustand';




export type statusType = 'all' | 'pending' | 'completed' 
export type prioritiesType =  'p0' | 'p1' | 'p2' | 'all';
interface TaskStore {
  FilterTasks:Task[];
  priorityFilter:prioritiesType;
  nameFilter:string
  statusFilter:statusType; 
  dateFilter: DateRange  ;
  setpriorityFilter: (priority:prioritiesType) => void;
  setStatusFilter: (status:statusType) => void;
  setDateFilter: (date:DateRange) => void;
  setNameFilter:(name:string)=>void;
  setTasksFilter:(tasks:Task[]) => void;
}
const currentDate = new Date();

const nextMonthDate = addMonths(currentDate, 1);
const useFilterStore = create<TaskStore>((set) => ({ 
  FilterTasks:[],
  priorityFilter:'all',  
  statusFilter: 'all', 
  nameFilter:'',
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
  setNameFilter:(name:string)=>{
    set({nameFilter:name})
  },
  setTasksFilter: (tasks?:any) => {
    set({  FilterTasks: tasks });
  },

}));




export default useFilterStore;
