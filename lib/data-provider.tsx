"use client";
import { CategoryType } from "@/app/categories/columns";
import { IncomeAndExpensesItemsType } from "@/app/income-and-expanse-items/columns";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { useLocalStorage } from "@/hooks/use-locale-storage";

export type BudgetTrackingData = {
  categories: CategoryType[];
  incomeAndExpensesItems: IncomeAndExpensesItemsType[];
} | null;

type ContextTypes = {
  budgetTrackingData: BudgetTrackingData;
  setBudgetTrackingData: Dispatch<SetStateAction<BudgetTrackingData>>;
} | null;

const DataContext = createContext<ContextTypes>(null);

type DataProvider = {
  children: React.ReactNode;
};

export default function DataProvider({ children }: DataProvider) {
  const [budgetTrackingData, setBudgetTrackingData] =
    useLocalStorage<BudgetTrackingData | null>(
      "budgetTrackingLocalStorageKey",
      null
    );
  return (
    <DataContext.Provider value={{ budgetTrackingData, setBudgetTrackingData }}>
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
