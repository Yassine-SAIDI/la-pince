'use client';

import { GetHistoryPeriodsResponseType } from '@/app/api/history-periods/route';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Period, Timeframe } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
interface Props {
    period : Period;
    setPeriod: (period: Period) => void;
    timeframe: Timeframe;
    setTimeframe: (timeframe: Timeframe) => void;
    }

function HistoryPerdiodSelector({
    period,
    setPeriod,
    timeframe,
    setTimeframe
}: Props) {

    const historyPeriods = useQuery<GetHistoryPeriodsResponseType>({
        queryKey: ["overview", 'periods', "history"],
        queryFn: () => fetch('/api/history-periods').then((res) => res.json()),            
    });
  return (
    <div className='flex flex-wrap gap-4 items-center'>
      <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWith={false}>
        <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as Timeframe)}>
            <TabsList>
                <TabsTrigger value='year'>
                    Année
                </TabsTrigger>
                <TabsTrigger value='month'>
                    Mois
                </TabsTrigger>
            </TabsList>
        </Tabs>
      </SkeletonWrapper>
      <div className='flex flex-wrap items-center gap-2'>
        <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWith={false}>
            <YearSelector 
            period={period} 
            setPeriod={setPeriod} 
            years={historyPeriods.data || []}/>
        </SkeletonWrapper>
        {timeframe === 'month' && (
            <SkeletonWrapper 
            isLoading={historyPeriods.isFetching} fullWith={false}>
                <MonthSelector period={period} setPeriod={setPeriod}/>
            </SkeletonWrapper>
            )}
      </div>
    </div>
  )
}

export default HistoryPerdiodSelector


function YearSelector({period, setPeriod, years}: {period: Period, setPeriod: (period: Period) => void, years: GetHistoryPeriodsResponseType}) {
    return (
        <Select
        value={period.year.toString()}
        onValueChange={(e) => setPeriod({year: parseInt(e), month: period.month})}
        >
        <SelectTrigger className='w-40'>
            <SelectValue/>
        </SelectTrigger>
        <SelectContent>
            {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                    {year}
                </SelectItem>
            ))}
        </SelectContent>
        </Select>
    )
}

function MonthSelector({period, setPeriod}: {period: Period, setPeriod: (period: Period) => void}) {
    return (
        <Select
        value={period.month.toString()}
        onValueChange={(e) => setPeriod({month: parseInt(e), year: period.year})}
        >
        <SelectTrigger className='w-40'>
            <SelectValue/>
        </SelectTrigger>
        <SelectContent>
            {[0,1,2,3,4,5,6,7,8,9,10,11].map((month) => {
                const monthStr = new Date(period.year, month, 1).toLocaleString('default', {month: 'long'});
                return (
                <SelectItem key={month} value={month.toString()}>
                    {monthStr}
                </SelectItem>
            )
            })} 
        </SelectContent>
        </Select>
    )
}
