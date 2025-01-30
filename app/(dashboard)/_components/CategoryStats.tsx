"use client";

import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers";
import { TransactionType } from "@/lib/types";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

interface Props {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}

function CategoryStats({ userSettings, from, to }: Props) {
  
  const statsQuery = useQuery<GetCategoriesStatsResponseType>({
    queryKey: ["overview", "categories", "stats", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
          to
        )}`
      ).then((res) => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  return (
  <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
    <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard
        formatter={formatter}
        type = "income"
        data={statsQuery.data || []}
        />
    </SkeletonWrapper>
    <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard
        formatter={formatter}
        type = "expense"
        data={statsQuery.data || []}
        />
    </SkeletonWrapper>

  </div>

)}

export default CategoryStats;


function CategoriesCard ({ formatter, type, data }:{
    type: TransactionType;
    formatter: Intl.NumberFormat;
    data: GetCategoriesStatsResponseType;
}) {
    const filteredData = data.filter((category) => category.type === type);
    const total = filteredData.reduce(
        (acc, category) => acc + (category._sum?.amount || 0), 0);


    return (
        <Card className="h-80 w-full col-span-6">
            <CardHeader>
                <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">

                </CardTitle>
            </CardHeader>
            <div className="flex items-center justify-between gap-2 ">
                {filteredData.length === 0 && (
                    <div className="flex h-60 w-full flex-col items-center justify-center">
                      Aucune donnée pour cette période
                    <p className="text-sm text-muted-foreground">Veuillez vérifier les dates ou ajouter{""}
                    {type === "income" ? " des revenus" : " des dépenses"} pour cette période
                    </p>
                    </div>
                )}
                
            </div>
        </Card>
    );
    }