import PageContainer from "@/components/page-container";
import React from "react";

import { DataTable } from "../../components/data-table";
import { IncomeAndExpensesItemsType, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

async function getData(): Promise<IncomeAndExpensesItemsType[]> {
  return [
    {
      id: "728ed52f",
      itemName: "Su Faturası",
      itemAmount: 100,
      itemDate: "2024-11-27T00:00:00.000Z",
      categoryName: "Fatura",
      itemDescription: "Su faturası ödemesi yapıldı.",
    },
    {
      id: "728ed5xv",
      itemName: "Ek Ders",
      itemAmount: 500,
      itemDate: "2024-11-29T00:00:00.000Z",
      categoryName: "Ek Gelir",
      itemDescription: "Ek ders verilerek gelir sağlandı.",
    },
  ];
}

export default async function IncomeAndExpanseItemsPage() {
  const data = await getData();
  return (
    <PageContainer title="Gelir ve Gider Kalemleri">
      <Button size="lg">
        <Plus strokeWidth={3} />
        Eklemek İçin Tıklayınız!
      </Button>
      <DataTable
        columns={columns}
        data={data}
        filterItemKey="itemName"
        filterInputPlaceholder="Kalem isimlerini filtrele..."
      />
    </PageContainer>
  );
}
