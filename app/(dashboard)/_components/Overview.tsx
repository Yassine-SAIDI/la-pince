"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";
import StatsCards from "./StatsCards";
import CategoryStats from "./CategoryStats";

function Overview({ userSettings }: { userSettings: UserSettings }) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <>
    <div className="container p-6 flex flex-wrap gap-2 items-end justify-between">
      <h2 className="mt-12 text-3xl font-bold">Overview</h2>
      <div className="flex items-center gap-3">
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range;
            if (!from || !to) return;
            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast.error(
                `La plage de date ne peut pas dépasser ${MAX_DATE_RANGE_DAYS} jours`
              );
              return;
            }
            setDateRange({ from, to });
          }}
        />
      </div>
    </div>
    <div className="container flex w-full flex-col gap-4 px-6">
    <StatsCards
    userSettings={userSettings}
    from={dateRange.from}
    to={dateRange.to}
    />
    
    <CategoryStats
    userSettings={userSettings}
    from={dateRange.from}
    to={dateRange.to}
    />
    </div>
    </>
  );
}

export default Overview;
