"use client";

import { ThemeProvider } from 'next-themes';
import React, { type ReactNode } from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


function RootProviders({ children } : { children: ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        disableTransitionOnChange={true}
      storageKey="theme-preference"
    >
        {children}
    </ThemeProvider>
    </QueryClientProvider>
  )
}

export default RootProviders
