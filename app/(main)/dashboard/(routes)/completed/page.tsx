// pages/index.tsx
'use client'
import { GetAllTasks } from '@/components/helper/helper';
import useFilterStore from '@/hooks/use-filter-store';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
  

const CompletedTasks = () => {
  
  const {data:Tasks,isLoading:IsLoading} = useQuery({ queryKey: ['tasks'], queryFn: GetAllTasks })
  const {  statusFilter, setStatusFilter } = useFilterStore();

  // Filter tasks based on status
  if(!Tasks){
    return null;
  }
  const filteredTasks = Tasks.filter(
    (task:any) => statusFilter === 'all' || task.status === statusFilter
  );

  return (
    <div>
      {/* Filter buttons */}
      <button onClick={() => setStatusFilter('all')}>All Tasks</button>
      <button onClick={() => setStatusFilter('pending')}>Pending</button>
      <button onClick={() => setStatusFilter('completed')}>Completed</button>

       


    </div>
  );
};

export default CompletedTasks;
