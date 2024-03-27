'use client'
import React, { useState } from 'react' 
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    
  } from '@tanstack/react-query' 
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const QueryProvider = ({children}:{children:React.ReactNode}) => {
    
const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
        
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider
