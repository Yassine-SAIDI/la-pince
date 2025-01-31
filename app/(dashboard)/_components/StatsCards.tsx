"use client";

import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card } from "@/components/ui/card";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import React, { ReactNode, useCallback, useMemo } from "react";
import CountUp from "react-countup";

interface Props {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}

function StatsCards({ from, to, userSettings }: Props) {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const incomes = statsQuery.data?.incomes || 0;
  const expenses = statsQuery.data?.expenses || 0;
  const balance = incomes - expenses;

  return (
    <div className="relative flex flex-wrap gap-2 w-full md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          title="Revenues"
          value={incomes}
          icon={
            <TrendingUp className="text-emerald-500 bg-emerald-400/10 h-12 w-12 items-center rounded-lg p-2" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          title="Dépenses"
          value={expenses}
          icon={
            <TrendingDown className="text-red-500 bg-red-400/10 h-12 w-12 items-center rounded-lg p-2" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
        title="Solde"
          value={balance}
          icon={
            <Wallet className="h-12 w-12 items-center rounded-lg p-2" />
          }
        />
      </SkeletonWrapper>
    </div>
  );
}

export default StatsCards;

function StatCard({
  title,
  value,
  icon,
  formatter,
}: {
  title: string;
  value: number;
  icon: ReactNode;
  formatter: Intl.NumberFormat;
}) {
  const formatFn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter]
  );
  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flex flex-col gap-1 items-start">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          end={value}
          preserveValue
          redraw={false}
          decimal="2"
          formattingFn={formatFn}
          className="text-xl font-bold"
        />
      </div>
    </Card>
  );
}
