
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
 

import { cn } from '@/lib/utils'; 

 
 
 
import ModalProvider from '@/components/providers/modal-provider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { useState } from 'react';
import QueryProvider from '@/components/providers/query-provider';
const font = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Todo app',
  description: 'ms developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (  
  
<QueryProvider>
        <ClerkProvider appearance={{ elements: { footer: 'hidden' } }}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className)}>
          <ThemeProvider
            defaultTheme="dark"
            attribute="class"
            enableSystem={false}
            storageKey="todo"
          >   
  
              {children}
            
            <ModalProvider />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
     </QueryProvider>
    
 
  );
}
