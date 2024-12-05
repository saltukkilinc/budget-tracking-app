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
import { CategoryForm } from "@/app/categories/category-form";
import { BudgetItemForm } from "@/app/income-and-expanse-items/form";

export type BudgetTrackingData = {
  categories: CategoryType[];
  incomeAndExpensesItems: IncomeAndExpensesItemsType[];
};

type ContextTypes = {
  budgetTrackingData: BudgetTrackingData;
  setBudgetTrackingData: Dispatch<SetStateAction<BudgetTrackingData>>;
  isDialogOpenHandler: (name: PopoverNameType) => boolean;
  setIsDialogOpen: Dispatch<SetStateAction<PopoverType>>;
  itemId: number | null;
  setItemId: Dispatch<SetStateAction<number | null>>;
  createNewCategory: (data: CategoryForm) => void;
  updateCategory: (data: CategoryForm) => void;
  createNewBudgetItem: (data: BudgetItemForm) => void;
  updateNewBudgetItem: (data: BudgetItemForm) => void;
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
  const [itemId, setItemId] = useState<number | null>(0);

  const isDialogOpenHandler = (name: PopoverNameType) => {
    return isDialogOpen.name === name && isDialogOpen.open;
  };

  const createNewCategory = (data: CategoryForm) => {
    const newCategory = {
      ...data,
      id:
        (budgetTrackingData?.categories?.length as number) > 0
          ? (budgetTrackingData?.categories.length as number) + 1
          : 0,
    } as CategoryType;

    const updatedCategories =
      (budgetTrackingData?.categories?.length as number) > 0
        ? [...(budgetTrackingData?.categories as CategoryType[]), newCategory]
        : [newCategory];

    const updatedTrackingData = {
      ...budgetTrackingData,
      categories: updatedCategories,
    } as BudgetTrackingData;

    setBudgetTrackingData(updatedTrackingData);
  };

  const updateCategory = (data: CategoryForm) => {
    setBudgetTrackingData((prev) => ({
      ...prev,
      categories: prev?.categories?.map((i) =>
        i.id === itemId ? { ...data, id: i.id } : i
      ),
    }));
  };

  const createNewBudgetItem = (data: BudgetItemForm) => {
    const newItem = {
      ...data,
      id:
        (budgetTrackingData?.incomeAndExpensesItems?.length as number) > 0
          ? (budgetTrackingData?.incomeAndExpensesItems.length as number) + 1
          : 0,
    } as IncomeAndExpensesItemsType;

    const updatedItems =
      (budgetTrackingData?.incomeAndExpensesItems?.length as number) > 0
        ? [
            ...(budgetTrackingData?.incomeAndExpensesItems as IncomeAndExpensesItemsType[]),
            newItem,
          ]
        : [newItem];

    const updatedTrackingData = {
      ...budgetTrackingData,
      incomeAndExpensesItems: updatedItems,
    } as BudgetTrackingData;

    setBudgetTrackingData(updatedTrackingData);
  };

  const updateNewBudgetItem = (data: BudgetItemForm) => {
    setBudgetTrackingData((prev) => ({
      ...prev,
      incomeAndExpensesItems: prev?.incomeAndExpensesItems?.map((i) =>
        i.id === itemId ? { ...data, id: i.id } : i
      ),
    }));
  };
  return (
    <DataContext.Provider
      value={{
        budgetTrackingData,
        setBudgetTrackingData,
        isDialogOpenHandler,
        setIsDialogOpen,
        itemId,
        setItemId,
        createNewCategory,
        updateCategory,
        createNewBudgetItem,
        updateNewBudgetItem,
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
