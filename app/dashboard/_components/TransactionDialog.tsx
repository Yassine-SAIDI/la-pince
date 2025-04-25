"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { ReactNode, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
} from "@/schema/transaction";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CategoryPicker from "./CategoryPicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar1Icon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { createTransaction } from "../_actions/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DateToUTCDate } from "@/lib/helpers";

interface Props {
  trigger: ReactNode;
  type: TransactionType;
}

function CreateTransactionDialog({ trigger, type }: Props) {
  const form = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
    },
  });

  const [open, setOpen] = useState(false);

  const handelCategoryChange = useCallback(
    (category: string) => {
      form.setValue("category", category);
    },
    [form]
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success("Transaction ajoutée avec succès", {
        id: "create-transaction",
      });

      form.reset({
        type,
        date: new Date(),
        description: "",
        amount: 0,
        category: undefined,
      });

      queryClient.invalidateQueries({
        queryKey: ["overview"],
      });

      setOpen((prev) => !prev);
    },
  });

  const onSubmit = useCallback(
    (value: CreateTransactionSchemaType) => {
      toast.loading("Ajout de la transaction en cours...", {
        id: "create-transaction",
      });

      mutate({
        ...value,
        date: DateToUTCDate(value.date),
      });
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Ajouter une nouvelle transaction de type {""}
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {type === "income" ? "Revenue" : "Dépense"}
            </span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input defaultValue={""} {...field} />
                  </FormControl>
                  <FormDescription>
                    La description de la transaction (optionnel)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant</FormLabel>
                  <FormControl>
                    <Input defaultValue={0} type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Le montant de la transaction
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Transaction: {form.watch("category")} */}
            <div className="flex items-center ml2 justify-between gap-2">
              <FormField
                  control={form.control}
                  name="category"
                  render={() => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Catégorie</FormLabel>
                      <FormControl>
                        <CategoryPicker
                          type={type}
                          onChange={handelCategoryChange}
                        />
                      </FormControl>
                      <FormDescription>
                        La catégorie de la transaction
                      </FormDescription>
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[200px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd MMMM yyyy")
                              ) : (
                                <span>Selectionner une date</span>
                              )}
                              <Calendar1Icon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(value) => {
                              if (!value) return;
                              // console.log("@@Calendar", value);
                              field.onChange(value);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription>La date de la transaction</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => form.reset()}
            >
              Annuler
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {!isPending && "Ajouter"}
            {isPending && <Loader2 className="animate-spin h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTransactionDialog;
