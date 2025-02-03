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
      {/* <div className="border-b bg-card"> */}
        {/* <div className="container flex flex-wrap items-center justify-between gap-6 py-3 px-16"> */}
          {/* <p className="text-2xl font-bold">Bienvenue, {user.firstName} ! </p> */}
        {/* </div> */}
          {/* <div className="flex items-center gap-3">
            <CreateTransactionDialog 
            trigger={
              <Button
              variant={"outline"}
              className='border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white'
              >
                Ajouter un Revenu
              </Button>
            }
            type={"income"}
            />
            <CreateTransactionDialog 
            trigger={
            <Button
            variant={"outline"}
            className='border-red-500 bg-red-950 text-white hover:bg-red-700 hover:text-white'
            >
              Ajouter une Dépense
            </Button>
            }
            type={"expense"}
            />
          </div> */}
      {/* </div> */}
      <Overview userSettings={userSettings}/>
      <History userSettings={userSettings}/>
    </div>
  )
}

export default page
