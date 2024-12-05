"use client";
import { CategoryType } from "@/app/categories/columns";
import { IncomeAndExpensesItemsType } from "@/app/income-and-expanse-items/columns";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { useLocalStorage } from "@/hooks/use-locale-storage";

export type BudgetTrackingData = {
  categories: CategoryType[];
  incomeAndExpensesItems: IncomeAndExpensesItemsType[];
};

type ContextTypes = {
  budgetTrackingData: BudgetTrackingData;
  setBudgetTrackingData: Dispatch<SetStateAction<BudgetTrackingData>>;
  isDialogOpenHandler: (name: PopoverNameType) => boolean;
  setIsDialogOpen: Dispatch<SetStateAction<PopoverType>>;
} | null;

const DataContext = createContext<ContextTypes>(null);

type DataProvider = {
  children: React.ReactNode;
};
type PopoverNameType = "categoryForm" | "budgetItemForm";

type PopoverType = { name: PopoverNameType; open: boolean };

export default function DataProvider({ children }: DataProvider) {
  const [budgetTrackingData, setBudgetTrackingData] =
    useLocalStorage<BudgetTrackingData>("budgetTrackingLocalStorageData", {
      categories: [],
      incomeAndExpensesItems: [],
    });
  const [isDialogOpen, setIsDialogOpen] = useState<PopoverType>({
    name: "categoryForm",
    open: false,
  });
  const isDialogOpenHandler = (name: PopoverNameType) => {
    return isDialogOpen.name === name && isDialogOpen.open;
  };
  //  (open) =>  setIsPopoverOpen({ name: "from", open })

  return (
    <DataContext.Provider
      value={{
        budgetTrackingData,
        setBudgetTrackingData,
        isDialogOpenHandler,
        setIsDialogOpen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataProvider() {
  const ctx = useContext(DataContext);
  if (!ctx)
    throw new Error("You should use useDataProvider in the DataProvider!");
  return ctx;
}
