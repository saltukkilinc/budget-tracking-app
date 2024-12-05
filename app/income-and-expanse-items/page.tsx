import React from "react";

import PageContainer from "@/components/page-container";
import DataTableGroup from "./data-table-group";

export default async function IncomeAndExpanseItemsPage() {
  return (
    <PageContainer title="Gelir ve Gider Kalemleri">
      <DataTableGroup />
    </PageContainer>
  );
}
