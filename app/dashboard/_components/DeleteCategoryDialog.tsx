"use client";

import { Category } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react'
import { toast } from 'sonner';
import { DeleteCategory } from '../_actions/categories';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { TransactionType } from '@/lib/types';

interface Props {
    trigger: ReactNode
    category: Category
    }

function DeleteCategoryDialog({trigger, category}: Props) {
    const categoryIdentifier = `${category.name}`
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: DeleteCategory,
        onSuccess: async () => {
            toast.success(`La catégorie ${categoryIdentifier} a été supprimée avec succès`)
        await queryClient.invalidateQueries({
            queryKey: ['categories'],
        })
    },
    onError: () => {
        toast.error(`Une erreur s'est produite lors de la suppression de la catégorie ${categoryIdentifier}`)
    }
    })


  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Êtes-vous sûr de vouloir supprimer la catégorie {categoryIdentifier} ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Cette action est irréversible
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                    // toast.loading(`Suppression de la catégorie ${categoryIdentifier}`);
                    deleteMutation.mutate({name: category.name, type: category.type as TransactionType})}
                    }>
                        Supprimer
                        </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCategoryDialog
