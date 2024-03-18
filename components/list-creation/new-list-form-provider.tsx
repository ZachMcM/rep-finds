"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, createContext, useContext } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

const NewListContext = createContext<NewListProviderValue | null>(null);

export const newListFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Must be at least 2 characters" })
    .max(50, { message: "Must be no more than 50 characters" }),
  category: z.string({ required_error: "A category is required"}),
  description: z
    .string()
    .min(2, { message: "Must be at least 2 characters" })
    .max(250, { message: "Must be no more than 250 characters" }),
  items: z
    .object({
      product: z.object({
        name: z.string(),
        productType: z.string(),
        imageUrl: z.string().url(),
        id: z.string(),
      }),
      price: z.coerce
        .number({ required_error: "Must be a valid price" })
        .nonnegative()
        .min(0.5, { message: "Price must be at least $0.50"})
        .nullish()
        .transform((x) => (x ? x : undefined)),
        link: z
        .string({
          required_error: "Must be a valid Pandabuy or Sugargoo link",
        })
        .startsWith("https://www.pandabuy.com/", {
          message: "Must be a valid Pandabuy or Sugargoo link",
        }).or(z.string({
          required_error: "Must be a valid Pandabuy or Sugargoo link"
        }).startsWith("https://www.sugargoo.com/")),
    })
    .array()
    .min(3, { message: "You must have at least 1 item in the list" }),
});

export type NewListFormValues = z.infer<typeof newListFormSchema>;

export type NewListProviderValue = UseFormReturn<NewListFormValues>;

export function NewListFormProvider({ children }: { children: ReactNode }) {
  const form = useForm<NewListFormValues>({
    resolver: zodResolver(newListFormSchema),
    defaultValues: {
      items: []
    }
  });

  return (
    <NewListContext.Provider value={form}>{children}</NewListContext.Provider>
  );
}

export function useNewListForm() {
  return useContext(NewListContext) as NewListProviderValue;
}
