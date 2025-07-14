import { prisma } from "@/lib/prisma";
import { Period, Timeframe } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { getDaysInMonth } from "date-fns";
import { redirect } from "next/navigation";
import { z } from "zod";

const getHistoryDataSchema = z.object({
    timeframe: z.enum(["month", "year"]),
    month : z.coerce.number().min(0).max(11).default(0),
    year: z.coerce.number().min(2000).max(2100),
    });

export async function GET(request: Request){
    const user = await currentUser();
    if(!user){
        redirect('/sign-in');
    }

    const {searchParams} = new URL(request.url);
    const timeframe = searchParams.get('timeframe')
    const year = searchParams.get('year')
    const month = searchParams.get('month')

    const queryParams = getHistoryDataSchema.safeParse({
        timeframe,
        year,
        month,
    });

    if(!queryParams.success){
        return Response.json(queryParams.error.message, {status: 400});
    }

    const data = await getHistoryData(user.id, queryParams.data.timeframe,{
        year: queryParams.data.year,
        month: queryParams.data.month,
    });
    return Response.json(data);
}

export type GetHistoryDataResponseType = Awaited<ReturnType<typeof getHistoryData>>;

async function getHistoryData(userId: string, timeframe: Timeframe, period: Period){
    if(timeframe === 'month'){
        return getMonthHistoryData(userId, period.month, period.year);
    }else if(timeframe === 'year'){
        return getYearHistoryData(userId, period.year);
    }
    
    // Retour par défaut pour éviter l'erreur TypeScript
    return [];
}

type HistoryData = {
    month: number;
    day?: number;
    year: number;
    income: number;
    expense: number;
};

async function getYearHistoryData(userId: string, year: number){
    const result = await prisma.yearHistory.groupBy({
        by: ["month"],
        where: {
            userId,
            year,
        },
        _sum: {
            income: true,
            expense: true,
        },
        orderBy: {
            month: 'asc',
        },
    });

    if(!result || result.length === 0) return [];

    const history : HistoryData[] = [];

    for(let i = 0; i < 12; i++){
        let expense = 0;
        let income = 0;

        const month = result.find((r) => r.month === i);
        if(month){
            expense = month._sum.expense || 0;
            income = month._sum.income || 0;
        }

        history.push({
            month: i,
            expense,
            income,
            year,

        });
    }

    return history;
}

async function getMonthHistoryData(userId: string, month: number, year: number){
    const result = await prisma.monthHistory.groupBy({
        by: ["day"],
        where: {
            userId,
            year,
            month,
        },
        _sum: {
            income: true,
            expense: true,
        },
        orderBy: {
            day: 'asc',
        },
    });

    if(!result || result.length === 0) return [];

    const history : HistoryData[] = [];
    const daysInMonth = getDaysInMonth(new Date(year, month ));
    for(let i = 1; i <= daysInMonth; i++){
        let expense = 0;
        let income = 0;

        const day = result.find((r) => r.day === i);
        if(day){
            expense = day._sum.expense || 0;
            income = day._sum.income || 0;
        }

        history.push({
            day: i,
            expense,
            income,
            month,
            year,
        });
    }
    return history;
}