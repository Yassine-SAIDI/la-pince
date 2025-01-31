"use client";

interface Props {
  type: TransactionType;
  successCallback: (category: Category) => void;
  trigger?: React.ReactNode;
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Form
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleOff, Loader2, PlusSquare } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategory } from "../_actions/categories";
import { Category } from "@prisma/client";
import { toast } from "sonner";
import { useTheme } from "next-themes";

function CreateCategoryDialog({ type, successCallback, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });

  const queryClient = useQueryClient();
  const theme = useTheme();

const {mutate, isPending} = useMutation({
    mutationFn: CreateCategory, 
    onSuccess: async (data: Category) => {
        form.reset({
            name: "",
            icon: "",
            type,
        });
        toast.success("Catégorie ajoutée avec succès", {
            id: "create-category",
        });
        successCallback(data);

        await queryClient.invalidateQueries({
            queryKey: ["categories"],
        });

        setOpen((prev) => !prev);
    },
    onError : () => {
        toast.error("Erreur lors de l'ajout de la catégorie", {
            id: "create-category",
        });
    }
});

const onSubmit = useCallback((value: CreateCategorySchemaType) => {
    toast.loading("Ajout de la catégorie...", {
        id: "create-category",
    });
    mutate(value);
}, [mutate]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        { trigger ? (trigger) : (
          <Button
          variant={"ghost"}
          className="flex border-separate items-center rounded-b-none border-b p-3 text-muted-foreground "
        >
          <PlusSquare className="mr-2 h-4 w-4" />
          Ajouter une catégorie
        </Button>
      )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Ajouter une catégorie pour{""}
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {type === "income" ? "Revenue" : "Dépense"}
            </span>
          </DialogTitle>
          <DialogDescription>
            Ajouter une nouvelle catégorie pour vos{" "}
            {type === "income" ? "revenus" : "dépenses"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder={"Catégorie"} {...field} />
                  </FormControl>
                  <FormDescription>Le nom de la catégorie</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icone</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="h-[100px] w-full"
                        >
                          {form.watch("icon") ? (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-5xl" role="img">
                                {field.value}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Modifier l&apos;icone
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <CircleOff className="h-12 w-12" />
                              <p className="text-xs text-muted-foreground">
                                Selectionner une icone
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <Picker
                          data={data}
                          theme={theme.resolvedTheme}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    L&apos;icone de la catégorie
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
      <DialogFooter>
        <DialogClose asChild>
              <Button
              type="button"
              variant={"secondary"}
              onClick={() => form.reset()}>
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

export default CreateCategoryDialog;
