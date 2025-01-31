"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetFormatterForCurrency } from "@/lib/helpers";
import { Period, Timeframe } from "@/lib/types";
import { UserSettings } from "@prisma/client";
import React, { useMemo, useState, useCallback } from "react";
import HistoryPerdiodSelector from "./HistoryPerdiodSelector";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import CountUp from "react-countup";

function History({ userSettings }: { userSettings: UserSettings }) {
  const [timeframe, setTimeframe] = useState<Timeframe>("month");
  const [period, setPeriod] = useState<Period>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const historyDataQuery = useQuery({
    queryKey: ["overview", "history", timeframe, period],
    queryFn: () =>
      fetch(
        `/api/history-data?timeframe=${timeframe}&year=${period.year}&month=${period.month}`
      ).then((res) => res.json()),
  });

  const dataAvailable =
    historyDataQuery.data && historyDataQuery.data.length > 0;

  return (
    <div className="container p-6">
      <h2 className="mt-12 text-3xl font-bold">Historique</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row gap-2 justify-between md:grid-flow-col">
            <HistoryPerdiodSelector
              period={period}
              setPeriod={setPeriod}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
            <div className="flex h-10 gap-2">
              <Badge
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <div className="text-emerald-500">Revenu</div>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <div className="text-red-500">Dépense</div>
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonWrapper isLoading={historyDataQuery.isFetching}>
            {dataAvailable && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  height={300}
                  data={historyDataQuery.data}
                  barCategoryGap={5}
                >
                  <defs>
                    <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#10B981" stopOpacity={1} />
                      <stop offset="1" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#EF4444" stopOpacity={1} />
                      <stop offset="1" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="5 5"
                    stopOpacity={0.2}
                    vertical={false}
                  />
                  <XAxis
                    stroke="#888888"
                    tickLine={false}
                    fontSize={12}
                    axisLine={false}
                    padding={{ left: 5, right: 5 }}
                    dataKey={(data) => {
                      const { year, month, day } = data;
                      const date = new Date(year, month, day || 1);
                      if (timeframe === "year") {
                        return date.toLocaleString("default", {
                          month: "long",
                        });
                      }
                      return date.toLocaleString("default", { day: "2-digit" });
                    }}
                  />
                  <YAxis
                    stroke="#888888"
                    tickLine={false}
                    fontSize={12}
                    axisLine={false}
                  />
                  <Bar
                    dataKey="income"
                    fill="url(#incomeBar)"
                    label={"income"}
                    radius={4}
                    className="cursor-pointer"
                  />
                  <Bar
                    dataKey="expense"
                    fill="url(#expenseBar)"
                    label={"expense"}
                    radius={4}
                    className="cursor-pointer"
                  />
                  <Tooltip
                    cursor={{ opacity: 0.1 }}
                    content={(props) => {
                        return <CustomTooltip {...props} formatter={formatter} />
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
            {!dataAvailable && (
              <Card className="flex flex-col items-center justify-center bg-background h-72 gap-4">
                Aucune donnée disponible pour cette période
                <p className="text-sm text-muted-foreground">
                  Veuiller sélectionner une autre période
                </p>
              </Card>
            )}
          </SkeletonWrapper>
        </CardContent>
      </Card>
    </div>
  );
}

export default History;


function CustomTooltip({ active, payload, formatter }: any) {
    if (!active || !payload || payload.length === 0) return null;
    
    const data = payload[0].payload;
    const {income, expense} = data;

    return (
        <div className="min-w-[300px] rounded border bg-background p-4">
            <TooltipRow 
            formatter={formatter} 
            label="Dépense" 
            value={expense} 
            bgColor="bg-red-500" 
            textColor="text-red-500" />
            <TooltipRow
            formatter={formatter}
            label="Revenu"
            value={income}
            bgColor="bg-emerald-500"
            textColor="text-emerald-500"
            />
            <TooltipRow
            formatter={formatter}
            label="solde"
            value={income - expense}
            bgColor="bg-gray-500"
            textColor="text-gray-500"
            />

        </div>
    );
    
    }


    
    function TooltipRow({ label, value, bgColor, textColor, formatter }: { label: string, value: number, bgColor: string, textColor: string, formatter: Intl.NumberFormat }) {
    const formattingFn = useCallback(
        (value: number) => {
        return formatter.format(value);
    }, [formatter]);    
    return (
        <div className="flex items-center gap-2">
            <div className={cn("h-4 w-4 rounded-full", bgColor)}/>
            <div className="flex w-full justify-between">
                <p className="text-sm text-muted-foreground">{label}</p>
                <div className={cn("text-sm font-bold", textColor)}>
                    <CountUp 
                    duration={0.5} 
                    preserveValue
                    decimals={0}
                    className="text-sm"
                    end={value} 
                    formattingFn= {formattingFn}
                   />
                </div>
            </div>
        </div>
    );
}