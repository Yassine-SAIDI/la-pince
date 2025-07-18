"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DeleteTransaction(id: string) {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
    }

    const transaction = await prisma.transaction.findUnique({
        where: {
            userId : user.id,
            id,
        },
    });

    if (!transaction) {
        throw new Error("Transaction not found");
    }

    await prisma.$transaction([
    
        prisma.transaction.delete({
            where: {
                userId: user.id,
                id,
            },
        }),

    ]);

    prisma.monthHistory.update({
        where: {
            userId_day_month_year: {
                userId: user.id,
                day: transaction.date.getUTCDate(),
                month: transaction.date.getUTCMonth() + 1,
                year: transaction.date.getUTCFullYear(),
        },
        },
        data: {
            ...(transaction.type === "income" && {
                income: {
                    decrement: transaction.amount,
                },
            }),
            ...(transaction.type === "expense" && {
                expense: {
                    decrement: transaction.amount,
                },
            }),
        },
    });
    
    prisma.yearHistory.update({
        where: {
            userId_month_year: {
                userId: user.id,
                month: transaction.date.getUTCMonth() + 1,
                year: transaction.date.getUTCFullYear(),
            },
        },
        data : {
            ...(transaction.type === "income" && {
                income: {
                    decrement: transaction.amount,
                },
            }),
            ...(transaction.type === "expense" && {
                expense: {
                    decrement: transaction.amount,
                },
            }),
        },
    });
    

}