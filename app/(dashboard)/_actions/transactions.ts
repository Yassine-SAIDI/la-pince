"use server";

import { prisma } from "@/lib/prisma";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createTransaction(form: CreateTransactionSchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form);
  if(!parsedBody.success) {
    throw new Error("Invalid form data" + parsedBody.error.message);
  }

  const user = await currentUser();
  if(!user) {
    redirect("/sign-in");
  }


  const { type, amount, category, date, description } = parsedBody.data;
  const categoryRow = await prisma.category.findFirst({
    where: {
      name: category,
      userId: user.id,
    },
  });

    if (!categoryRow) {
        throw new Error("Category not found");
    }

    await prisma.$transaction([
        prisma.transaction.create({
            data: {
                userId: user.id,
                type,
                amount,
                description: description || "",
                date,
                category: categoryRow.name,
                categoryIcon: categoryRow.icon,
            },
        }),

        // update aggregate table (month )
        prisma.monthHistory.upsert({
            where: {
                userId_day_month_year: {
                    userId: user.id,
                    day: date.getUTCDate(),
                    month: date.getUTCMonth(),
                    year: date.getUTCFullYear(),
                },
            },
            create: {
                userId: user.id,
                day: date.getUTCDate() + 1,
                month: date.getUTCMonth() + 1,
                year: date.getUTCFullYear(),
                expense: type === "expense" ? amount : 0,
                income: type === "income" ? amount : 0,
            },
            update: {
                expense: {
                    increment: type === "expense" ? amount : 0,
                },
                income: {
                    increment: type === "income" ? amount : 0,
                },
            },
        }),


        // update aggregate table (year)
        prisma.yearHistory.upsert({
            where: {
                userId_month_year: {
                    userId: user.id,
                    month: date.getUTCMonth() ,
                    year: date.getUTCFullYear(),
                },
            },
            create: {
                userId: user.id,
                month: date.getUTCMonth() + 1,
                year: date.getUTCFullYear(),
                expense: type === "expense" ? amount : 0,
                income: type === "income" ? amount : 0,
            },
            update: {
                expense: {
                    increment: type === "expense" ? amount : 0,
                },
                income: {
                    increment: type === "income" ? amount : 0,
                },
            },
        }),
    ]);



        

 
}