"use client";

import { ThemeProvider } from 'next-themes';
import React, { type ReactNode } from 'react'

function RootProviders({ children } : { children: ReactNode }) {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        disableTransitionOnChange={true}
      storageKey="theme-preference"
    >
        {children}
    </ThemeProvider>
  )
}

export default RootProviders
