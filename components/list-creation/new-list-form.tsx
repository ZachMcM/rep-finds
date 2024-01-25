"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ItemsList } from "./items-list";

export const newListFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Must be at least 2 characters" })
    .max(50, { message: "Must be no more than 50 characters" }),
  description: z
    .string()
    .min(2, { message: "Must be at least 2 characters" })
    .max(250, { message: "Must be no more than 250 characters" }),
});

export function NewListForm() {
  const form = useForm<z.infer<typeof newListFormSchema>>({
    resolver: zodResolver(newListFormSchema),
  });

  function onSubmit(values: z.infer<typeof newListFormSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="max-w-xl"
                    {...field}
                    placeholder="Enter a title"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-w-xl"
                    {...field}
                    placeholder="Enter a description"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <ItemsList/>
    </div>
  );
}
