import React from "react";
import PageContainer from "@/components/page-container";

import BudgetItemsPayChartGroup from "./budget-items-pay-chart-group";

export default function ReportsPage() {
  return (
    <PageContainer title="Raporlar">
      <BudgetItemsPayChartGroup />
    </PageContainer>
  );
}
