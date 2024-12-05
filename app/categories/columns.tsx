"use client";

import { formatMoney } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useDataProvider } from "@/lib/data-provider";

export type CategoryType = {
  id: number;
  categoryName: string;
  categoryType: "income" | "expense";
  categoryLimit: number;
};

export const columns: ColumnDef<CategoryType>[] = [
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
    accessorKey: "categoryName",
    header: "Kategori Adı",
  },
  {
    accessorKey: "categoryType",
    header: "Kategori Türü",
    cell: ({ row }) => (
      <div className=" font-medium">
        {row.getValue("categoryType") === "income" ? "GELİR" : "GİDER"}
      </div>
    ),
  },
  {
    accessorKey: "categoryLimit",
    header: "Kategori Limiti",
    cell: ({ row }) => {
      const amount = row.getValue("categoryLimit") as number;
      return (
        <div className=" font-medium">
          {amount > 0 ? formatMoney(amount) : "LİMİTSİZ"}
        </div>
      );
    },
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
                  categories: prev.categories.filter((i) => i.id !== item.id),
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
