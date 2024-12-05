"use client";

import { AlertCircle, Plus } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import FormDialog from "@/components/form-dialog";

import CategoryForm from "./category-form";
import { columns } from "./columns";
import { useDataProvider } from "@/lib/data-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DataTableGroup() {
  const { budgetTrackingData, isDialogOpenHandler, setIsDialogOpen } =
    useDataProvider();

  return (
    <div>
      <Button
        size="lg"
        onClick={() => setIsDialogOpen({ name: "categoryForm", open: true })}
      >
        <Plus strokeWidth={3} />
        Eklemek İçin Tıklayınız!
      </Button>
      {budgetTrackingData?.categories &&
      (budgetTrackingData?.categories?.length as number) > 0 ? (
        <DataTable
          columns={columns}
          data={budgetTrackingData?.categories}
          filterItemKey="categoryName"
          filterInputPlaceholder="Kategori isimlerini filtrele..."
        />
      ) : (
        <Alert className="mt-12">
          <AlertCircle />
          <AlertTitle>Veri Bulunamadı!</AlertTitle>
          <AlertDescription>
            Lütfen yukarıda ki butonu kullanarak kategori ekleyiniz!
          </AlertDescription>
        </Alert>
      )}

      <FormDialog
        title="Kategori Ekle"
        isDialogOpen={isDialogOpenHandler("categoryForm")}
        setDialogOpen={(open) =>
          setIsDialogOpen({ name: "categoryForm", open })
        }
      >
        <CategoryForm />
      </FormDialog>
    </div>
  );
}
