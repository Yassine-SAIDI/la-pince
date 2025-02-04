
import React, { type ReactNode } from 'react'

function layout({children}:{children: ReactNode}) {
  return (
    <div className='relative flex h-screen w-full flex-col px-6 sm:px-10 md:px-16 lg:px-24'>
        {children}
    </div>
  )
}

export default layout
