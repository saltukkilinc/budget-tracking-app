import React from "react";

import PageContainer from "@/components/page-container";
import DataTableGroup from "./data-table-group";

export default async function CategoriesPage() {
  return (
    <PageContainer title="Kategoriler">
      <DataTableGroup />
    </PageContainer>
  );
}
