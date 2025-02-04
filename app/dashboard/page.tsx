// import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
// import CreateTransactionDialog from './_components/TransactionDialog';
import Overview from './_components/Overview';
import History from './_components/History';

async function page() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
    }
  
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!userSettings) {
    return redirect('/wizard');
  }
  
  return (
    <div className='h-full bg-background'>
      <Overview userSettings={userSettings}/>
      <History userSettings={userSettings}/>
    </div>
  )
}

export default page
