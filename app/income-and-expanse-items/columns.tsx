"use client";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

import { formatMoney } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/data-provider";

export type IncomeAndExpensesItemsType = {
  id: number;
  itemName: string;
  itemAmount: number;
  categoryName: string;
  itemDate: string;
  itemDescription: string;
};

export const columns: ColumnDef<IncomeAndExpensesItemsType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "itemName",
    header: "Kalem Adı",
  },
  {
    accessorKey: "itemAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kalem Tutarı
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("itemAmount"));
      const formattedMoney = formatMoney(amount);
      const isIncome =
        (row.getValue("categoryName") as string).split(",")[1] === "income";
      return (
        <div
          className={cn(
            "font-medium",
            isIncome ? "text-green-500" : "text-red-500"
          )}
        >
          {formattedMoney}
        </div>
      );
    },
  },
  {
    accessorKey: "categoryName",
    header: "Kategori Adı",
    cell: ({ row }) => {
      const [name, type] = (row.getValue("categoryName") as string).split(",");
      const isIncome = type === "income";
      return (
        <p className={cn(isIncome ? "text-green-500" : "text-red-500")}>
          {name}
        </p>
      );
    },
  },
  {
    accessorKey: "itemDate",
    header: "Tarih",
    cell: ({ row }) => {
      const dateString = row.getValue("itemDate") as string;
      return (
        <div className=" font-medium">
          {format(dateString, "dd MMMM yyyy", { locale: tr })}
        </div>
      );
    },
  },
  {
    accessorKey: "itemDescription",
    header: "Açıklama",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setBudgetTrackingData } = useDataProvider();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                setBudgetTrackingData((prev) => ({
                  ...prev,
                  incomeAndExpensesItems: prev.incomeAndExpensesItems.filter(
                    (i) => i.id !== item.id
                  ),
                }))
              }
            >
              <Trash2 />
              SİL
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil />
              DÜZENLE
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
