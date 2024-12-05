"use client";
import React from "react";
import CustomPieChart from "./pie-chart";
// import { useDataProvider } from "@/lib/data-provider";

export default function PieChartGroup() {
  // const { budgetTrackingData } = useDataProvider();
  // const { categories } = budgetTrackingData;

  return (
    <div>
      <CustomPieChart />
    </div>
  );
}
