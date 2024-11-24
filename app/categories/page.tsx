import PageContainer from "@/components/page-container";
import React from "react";
import { CategoryType, columns } from "./columns";
import { DataTable } from "@/components/data-table";

async function getData(): Promise<CategoryType[]> {
  return [
    {
      id: "728ed52fs",
      categoryName: "Fatura",
      categoryType: "expense",
      categoryLimit: null,
    },
    {
      id: "721ed52fn",
      categoryName: "Maaş",
      categoryType: "income",
      categoryLimit: null,
    },
    {
      id: "721ed5sdn",
      categoryName: "Mutfak Harcaması",
      categoryType: "expense",
      categoryLimit: 2000,
    },
  ];
}

export default async function CategoriesPage() {
  const data = await getData();
  return (
    <PageContainer title="Kategoriler">
      <DataTable
        columns={columns}
        data={data}
        filterItemKey="categoryName"
        filterInputPlaceholder="Kategori isimlerini filtrele..."
      />
    </PageContainer>
  );
}
