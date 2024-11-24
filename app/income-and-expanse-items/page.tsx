import PageContainer from "@/components/page-container";
import React from "react";

import { DataTable } from "./data-table";
import { IncomeAndExpensesItemsType, columns } from "./columns";

async function getData(): Promise<IncomeAndExpensesItemsType[]> {
  return [
    {
      id: "728ed52f",
      itemName: "Su Faturası",
      itemAmount: 100,
      itemDate: "2024-11-27T00:00:00.000Z",
      itemType: "expense",
      itemDescription: "Su faturası ödemesi yapıldı.",
    },
    {
      id: "728ed5xv",
      itemName: "Ek Ders",
      itemAmount: 500,
      itemDate: "2024-11-29T00:00:00.000Z",
      itemType: "income",
      itemDescription: "Ek ders verilerek gelir sağlandı.",
    },
  ];
}

export default async function IncomeAndExpanseItemsPage() {
  const data = await getData();
  return (
    <PageContainer title="Gelir ve Gider Kalemleri">
      <DataTable columns={columns} data={data} />
    </PageContainer>
  );
}
