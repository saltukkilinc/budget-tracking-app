"use client";
import { useState } from "react";

import { Plus } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import FormDialog from "@/components/form-dialog";

import CategoryForm from "./category-form";
import { CategoryType, columns } from "./columns";

const data = [
  {
    id: "728ed52fs",
    categoryName: "Fatura",
    categoryType: "expense",
    categoryLimit: 0,
  },
  {
    id: "721ed52fn",
    categoryName: "Maaş",
    categoryType: "income",
    categoryLimit: 0,
  },
  {
    id: "721ed5sdn",
    categoryName: "Mutfak Harcaması",
    categoryType: "expense",
    categoryLimit: 2000,
  },
] as CategoryType[];

export default function DataTableGroup() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <div>
      <Button size="lg" onClick={() => setDialogOpen(true)}>
        <Plus strokeWidth={3} />
        Eklemek İçin Tıklayınız!
      </Button>
      <DataTable
        columns={columns}
        data={data}
        filterItemKey="categoryName"
        filterInputPlaceholder="Kategori isimlerini filtrele..."
      />
      <FormDialog
        title="Kategori Ekle"
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <CategoryForm />
      </FormDialog>
    </div>
  );
}
