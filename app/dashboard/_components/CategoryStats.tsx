"use client";

import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    const filteredData = data.filter((el) => el.type === type);
    const total = filteredData.reduce(
        (acc, el) => acc + Number(el._sum?.amount || 0), 0);


    return (
        <Card className="h-80 w-full col-span-6">
            <CardHeader>
                <CardTitle className="flex justify-between gap-2 text-muted-foreground text-lg md:text-xl">
                    <span>{type === "income" ? "Revenus" : "Dépenses"} par catégorie</span>
                    <span>{formatter.format(total)}</span>
                </CardTitle>
            </CardHeader>
            <div className="flex items-center justify-between gap-2 ">
                {filteredData.length === 0 && (
                    <div className="flex h-60 w-full flex-col items-center justify-center">
                      Aucune donnée pour cette période
                    <p className="text-sm text-muted-foreground text-center mt-2">Veuillez vérifier les dates ou ajouter{""}
                    {type === "income" ? " des revenus" : " des dépenses"} pour cette période
                    </p>
                    </div>
                )}

                {filteredData.length > 0 && (
                  //  à vérifier le H de la div
                  <ScrollArea className="min-h-60 h-auto w-full px-4">
                    <div className="flex flex-col gap-4 w-full p-4">
                      {filteredData.map((item) =>{
                        const amount = Number(item._sum.amount || 0);
                        const percentage = (amount / total) * 100;

                        return (
                          <div
                          key={item.category}
                          className="flex flex-col gap-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="flex items-center text-gray-400 text-lg">
                                {item.category}
                                <span className="text-muted-foreground text-sm ml-4 ">
                                  {percentage.toFixed(0) }%
                                </span>
                              </span>
                              <span className="text-sm text-gray-400">
                                {formatter.format(amount)}
                                </span>
                            </div>
                            <Progress value={percentage}
                            indicator = {
                              type === "income" ? "bg-emerald-500 " : "bg-red-500"
                            }
                            className="h-1 md:h-2 "
                            />
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                )}
                
            </div>
        </Card>
    );
    }