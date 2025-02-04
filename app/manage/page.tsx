"use client";

import { CurrencyComboBox } from '@/components/CurrencyComboBox';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { PlusSquare, TrashIcon, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Category } from '@prisma/client';
import DeleteCategoryDialog from '../dashboard/_components/DeleteCategoryDialog';
import CreateCategoryDialog from '../dashboard/_components/CreateCategoryDialog';

function page() {
  return (
    <>
    <div className='border-b bg-card'>
      <div className='container flex flex-wrap items-center justify-between gap-6 p-8'>
        <div>
        <p className="text-3xl font-bold">Gestion</p>
        <p className="text-muted-foreground">Gerer vos paramètres et catégories</p>
        </div>
      </div>
    </div>

    <div className="container flex flex-col gap-4 p-4">
        <Card className='flex items-center justify-between gap-4 px-6'>
            <CardHeader>
                <CardTitle>Devise</CardTitle>
                <CardDescription>Modifier votre devise actuelle</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
                <CurrencyComboBox />
            </CardContent>
        </Card>
        <CategoryList type="income" />
        <CategoryList type="expense" />
    </div>
    </>
  )
}

export default page


function CategoryList({ type }: {type: TransactionType}) {
    const categoriesQuery = useQuery({
        queryKey: ['categories', type],
        queryFn: () => fetch(`/api/categories?type=${type}`).then(res => res.json())
    })

    const dataAvailable = categoriesQuery.data &&categoriesQuery.data?.length > 0


    return (
        <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center justify-between gap-2 px-8'>
                        <div className="flex items-center gap-2">
                            {type === 'income' ? <TrendingUp className='items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500 h-12 w-12' /> : <TrendingDown className='items-center rounded-lg bg-red-400/10 p-2 text-red-500 h-12 w-12' />}
                        <div>
                            {type === 'income' ? 'Revenues' : 'Dépenses'}
                        <div className="text-sm text-muted-foreground">
                            Filtrer par nom
                        </div>
                        </div>
                        </div>
                        <CreateCategoryDialog type={type}  
                        successCallback={() => categoriesQuery.refetch}
                        trigger={
                            <Button className='gap-2 text-sm'>
                                <PlusSquare className='h-5 w-5' />
                                Ajouter une catégorie
                            </Button>
                        }
                            />
                    </CardTitle>
                </CardHeader>
                <Separator />
                {!dataAvailable && (
                        <div className="flex flex-col w-full h-40 items-center justify-center h-12">
                            <p>Aucune catégorie trouvée</p>
                            <p className='text-muted-foreground text-sm'>Ajoutez une catégorie pour commencer</p>
                        </div>
                    )}
                    {dataAvailable && (
                        <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {categoriesQuery.data.map((category: Category) => (
                                <CategoryCard category={category} key={category.name}/>
                            ))}
                        </div>
                    )}
            </Card>
        </SkeletonWrapper>
    )
}


function CategoryCard({ category }: {category: Category}) {
    return (
        <div className="flex border-separate flex-col justify-between rounded-md border shadow-black/10 dark:shadow-white/10">
            <div className="flex items-center flex-col gap-2 p-4">
                <span className="text-3xl" role='img'>{category.icon}</span>
                <span className="">{category.name}</span>
            </div>
            <DeleteCategoryDialog category={category} trigger={
            <Button className='flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20'
            variant={"secondary"}>
                <TrashIcon className='h-5 w-5' />
                Supprimer
            </Button>
            } />
            
        </div>

    )
}