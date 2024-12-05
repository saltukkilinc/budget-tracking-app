"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

import { useDataProvider } from "@/lib/data-provider";

const FormSchema = z.object({
  categoryName: z.string().min(2, {
    message: "Lütfen bir kategori adı giriniz.",
  }),
  categoryType: z.enum(["income", "expense"], {
    required_error: "Lütfen bir kategori türü seçiniz.",
  }),
  categoryLimit: z.coerce
    .number()
    .min(0, { message: "Lütfen geçerli bir tutar giriniz." })
    .optional(),
});
export type CategoryForm = z.infer<typeof FormSchema>;
type CategoryFormType = {
  values?: CategoryForm;
};
export default function CategoryForm({ values }: CategoryFormType) {
  const { createNewCategory, updateCategory, setIsDialogOpen, setItemId } =
    useDataProvider();

  const form = useForm<CategoryForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: values ?? {
      categoryName: "",
      categoryType: "income",
      categoryLimit: 0,
    },
  });

  function onSubmit(data: CategoryForm) {
    if (values) {
      updateCategory(data);
      setIsDialogOpen({ name: "categoryForm", open: false });
      setItemId(null);
    } else {
      createNewCategory(data);
    }
    form.reset({
      categoryName: "",
      categoryType: "income",
      categoryLimit: 0,
    });
  }

  const IS_CATEGORY_TYPE_INCOME = form.watch("categoryType") === "income";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <FormField
          control={form.control}
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori Adı</FormLabel>
              <FormControl>
                <Input placeholder="Kategori ismi giriniz..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori Türü</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori türü seçiniz..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Gelir</SelectItem>
                  <SelectItem value="expense">Gider</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori Limiti (İsteğe Bağlı)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Kategori limiti giriniz..."
                  type="number"
                  disabled={IS_CATEGORY_TYPE_INCOME}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Kategori türü gider olduğunda isteğe bağlı giriniz.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
