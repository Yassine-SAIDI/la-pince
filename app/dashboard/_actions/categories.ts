"use server";

import { prisma } from "@/lib/prisma";
import { CreateCategorySchema, CreateCategorySchemaType, DeleteCategorySchema, DeleteCategorySchemaType, UpdateCategorySchemaType, UpdateCategorySchema } from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
    const parsedBody = CreateCategorySchema.safeParse(form);
    if (!parsedBody.success) {
        throw new Error("Invalid body");
        }

        const user = await currentUser();
        if (!user) {
            redirect('/sign-in');
        }

        const {name, icon, type} = parsedBody.data;
        return await prisma.category.create({
            data: {
                userId: user.id,
                name,
                icon,
                type,
            },
        });
}


export async function DeleteCategory(form: DeleteCategorySchemaType) {
    const parsedBody = DeleteCategorySchema.safeParse(form);
    if (!parsedBody.success) {
        throw new Error("Invalid body");
    }
    const user = await currentUser();
    if (!user) {
        redirect('/sign-in');
    }

    return await prisma.category.delete({
        where: {
            name_userId_type: {
                name: parsedBody.data.name,
                userId: user.id,
                type: parsedBody.data.type,
            },
        }
    });
}


export async function UpdateCategory(form: UpdateCategorySchemaType) {
    const parsedBody = UpdateCategorySchema.safeParse(form);

    if (!parsedBody.success) {
        throw new Error("Invalid body");
    }

    const user = await currentUser();
    if (!user) {
        redirect('/sign-in');
    }

    const {name, icon, type} = parsedBody.data;

    return await prisma.category.update({
        where: {
            name_userId_type: {
                name: name,
                userId: user.id,
                type: type,
            },
        },
        data: {
            name: name,
            icon: icon,
            
            
        },
    });
}