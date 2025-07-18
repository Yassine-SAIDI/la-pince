import { z } from "zod";

export const CreateCategorySchema = z.object({
    name: z.string().min(3).max(30),
    icon: z.string().max(25),
    type: z.enum(["income", "expense"]),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = z.object({
    name: z.string().min(3).max(30),
    icon: z.string().max(25),
    type: z.enum(["income", "expense"]),
});

export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;

export const DeleteCategorySchema = z.object({
    name: z.string().min(3).max(30),
    type: z.enum(["income", "expense"]),
});

export type DeleteCategorySchemaType = z.infer<typeof DeleteCategorySchema>;