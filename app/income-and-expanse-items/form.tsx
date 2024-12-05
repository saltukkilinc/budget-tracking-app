"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { BudgetTrackingData, useDataProvider } from "@/lib/data-provider";

import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns/format";
import { IncomeAndExpensesItemsType } from "./columns";
import { formatISO, startOfDay } from "date-fns";

const FormSchema = z.object({
  itemName: z.string().min(2, {
    message: "Bir kalem ismi giriniz.",
  }),
  itemAmount: z.coerce
    .number()
    .min(1, { message: "Geçerli bir kalem tutarı giriniz." }),
  categoryName: z.string().min(1, {
    message: "Bir kategori ismi giriniz.",
  }),
  itemDate: z.date({
    required_error: "Lütfen bir item ismi giriniz.",
  }),
  itemDescription: z.string().min(1, {
    message: "Açıklama giriniz.",
  }),
});

export default function IncomeAndExpensesForm() {
  const { setBudgetTrackingData, budgetTrackingData } = useDataProvider();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      itemName: "",
      itemAmount: 0,
      categoryName: "",
      itemDate: new Date(),
      itemDescription: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newItem = {
      ...data,
      itemDate: formatISO(data.itemDate),
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
    form.reset({
      itemName: "",
      itemAmount: 0,
      categoryName: "",
      itemDate: new Date(),
      itemDescription: "",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kalem Adı</FormLabel>
              <FormControl>
                <Input placeholder="Kalem adı giriniz..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kalem Tutarı </FormLabel>
              <FormControl>
                <Input
                  placeholder="Kalem tutarı giriniz..."
                  type="number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori Adı</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori adı seçiniz." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {budgetTrackingData?.categories.map((i) => (
                    <SelectItem
                      value={i.categoryName + "," + i.categoryType}
                      key={i.id}
                      className={cn(
                        i.categoryType === "expense"
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                    >
                      {i.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Kalem Tarihi</FormLabel>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>tarih Seçiniz</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < startOfDay(new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kalem Açıklaması</FormLabel>
              <FormControl>
                <Input placeholder="Kalem Açıklaması giriniz.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
