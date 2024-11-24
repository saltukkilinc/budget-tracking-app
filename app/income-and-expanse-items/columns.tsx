"use client";

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

export type IncomeAndExpensesItemsType = {
  id: string;
  itemName: string;
  itemAmount: number;
  itemType: "income" | "expense";
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
      return <div className=" font-medium">{formattedMoney}</div>;
    },
  },
  {
    accessorKey: "itemType",
    header: "Kalem Türü",
  },
  {
    accessorKey: "itemDate",
    header: "Tarih",
  },
  {
    accessorKey: "itemDescription",
    header: "Açıklama",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      console.log(item.id);
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
            <DropdownMenuItem>
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
