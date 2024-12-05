"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDataProvider } from "@/lib/data-provider";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

type CardConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};

export default function BudgetItemsPayChart() {
  const { budgetTrackingData } = useDataProvider();

  const { incomeAndExpensesItems } = budgetTrackingData;
  const cardConfigForItemBudges = incomeAndExpensesItems.reduce(
    (acc, val, index) => {
      if (!acc[val.id.toString()]) {
        acc = {
          ...acc,
          [val.id.toString()]: {
            label: val.itemName,
            color: colors[index % 5],
          },
        };
      }
      return acc;
    },
    {} as CardConfig
  ) satisfies ChartConfig;
  const chartDataForItemBudges = incomeAndExpensesItems.map((i) => ({
    itemName: i.itemName,
    itemAmount: i.itemAmount,
    fill: `var(--color-${i.id})`,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Bütçe Kalem Giderleri Pasta Grafiği</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={cardConfigForItemBudges}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="w-[200px]" />}
            />
            <Pie
              data={chartDataForItemBudges}
              dataKey="itemAmount"
              nameKey="itemName"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {/* {totalVisitors.toLocaleString()} */}
                          Kalemler
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Gelir ve gider dağılımı bütçe kalemleri grafiği{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
