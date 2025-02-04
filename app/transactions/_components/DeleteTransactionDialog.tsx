import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'sonner';
import { DeleteTransaction } from '../_actions/deleteTransaction';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    transactionId: string;

    }


function DeleteTransactionDialog({open, setOpen, transactionId}: Props) {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: DeleteTransaction,
        onSuccess: async () => {
            toast.success(`La transaction a été supprimée avec succès`)
        await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === 'transactions'        
        })
    },
    onError: () => {
        toast.error(`Une erreur s'est produite lors de la suppression de la transaction`)
    }
    })


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Êtes-vous sûr de vouloir supprimer la transaction ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Cette action est irréversible
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                    // toast.loading(`Suppression de la catégorie ${categoryIdentifier}`);
                    deleteMutation.mutate(transactionId)}
                    }>
                        Supprimer
                        </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionDialog
