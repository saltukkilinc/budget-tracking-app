"use client";

import { AlertCircle, Plus } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import FormDialog from "@/components/form-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { columns } from "./columns";
import IncomeAndExpensesForm from "./form";

import { useDataProvider } from "@/lib/data-provider";

export default function DataTableGroup() {
  const {
    budgetTrackingData,
    isDialogOpenHandler,
    setIsDialogOpen,
    itemId,
    setItemId,
  } = useDataProvider();
  const budgetItemForEdit = budgetTrackingData?.incomeAndExpensesItems?.find(
    (i) => i.id === itemId
  );
  return (
    <div>
      <Button
        size="lg"
        onClick={() => setIsDialogOpen({ name: "budgetItemForm", open: true })}
      >
        <Plus strokeWidth={3} />
        Eklemek İçin Tıklayınız!
      </Button>
      {budgetTrackingData?.incomeAndExpensesItems &&
      (budgetTrackingData?.incomeAndExpensesItems?.length as number) > 0 ? (
        <DataTable
          columns={columns}
          data={budgetTrackingData?.incomeAndExpensesItems}
          filterItemKey="itemName"
          filterInputPlaceholder="Kalem isimlerini filtrele..."
        />
      ) : (
        <Alert className="mt-12">
          <AlertCircle />
          <AlertTitle>Veri Bulunamadı!</AlertTitle>
          <AlertDescription>
            Lütfen yukarıda ki butonu kullanarak bütçe kalemi ekleyiniz!
          </AlertDescription>
        </Alert>
      )}

      <FormDialog
        title="Bütçe Kalem Formu"
        isDialogOpen={isDialogOpenHandler("budgetItemForm")}
        setDialogOpen={(open) =>
          setIsDialogOpen({ name: "budgetItemForm", open })
        }
        onCloseHandler={() => setItemId(null)}
      >
        <IncomeAndExpensesForm values={budgetItemForEdit}/>
      </FormDialog>
    </div>
  );
}
