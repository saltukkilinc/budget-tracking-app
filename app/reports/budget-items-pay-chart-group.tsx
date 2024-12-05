"use client";
import React from "react";
import BudgetItemsPayChart from "./budget-items-pay-chart";
import { useDataProvider } from "@/lib/data-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function BudgetItemsPayChartGroup() {
  const { budgetTrackingData } = useDataProvider();
  return (
    <div>
      {budgetTrackingData?.incomeAndExpensesItems?.length > 0 ? (
        <BudgetItemsPayChart />
      ) : (
        <Alert className="mt-12">
          <AlertCircle />
          <AlertTitle>Veri Bulunamadı!</AlertTitle>
          <AlertDescription>
            Lütfen önce bütçe kalemi ekleyiniz!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
