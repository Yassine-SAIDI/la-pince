import Navbar from '@/components/Navbar'
import React, { type ReactNode } from 'react'

function layout({children}:{children: ReactNode}) {
  return (
    <div className='relative flex h-screen w-full flex-col px-6 sm:px-10 md:px-16 lg:px-24'>
        <Navbar />
        <div className='w-full'>
        {children}
        </div>
        <footer className='w-full bg-card p-4 flex flex-col items-center justify-center gap-4'>
        <p className='text-center text-muted-foreground text-sm'>
        La Pince © 2025 - Tous droits réservés
        </p>
        <div className='flex gap-4'>
        <a href='#' className='text-muted-foreground hover:text-white'>
        Mentions légales
        </a>
        <a href='#' className='text-muted-foreground hover:text-white'>
        Politique de confidentialité
        </a>
        </div>
        </footer>
    </div>
  )
}

export default layout
