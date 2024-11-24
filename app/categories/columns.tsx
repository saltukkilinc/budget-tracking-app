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

export type CategoryType = {
  id: string;
  categoryName: string;
  categoryType: "income" | "expense";
  categoryLimit: number | null;
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
    header: "kategori Türü",
  },
  {
    accessorKey: "categoryLimit",
    header: "Kategori Limiti",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("categoryLimit"));
      return (
        <div className=" font-medium">
          {amount ? formatMoney(amount) : "LİMİTSİZ"}
        </div>
      );
    },
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
