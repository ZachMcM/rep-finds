"use client";

import { categories } from "@/config/categories";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { ItemsList } from "./items-list";
import { NewListFormValues, useNewListForm } from "./new-list-form-provider";
import { useId } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export function NewListForm() {
  const form = useNewListForm();

  function onSubmit(values: NewListFormValues) {
    console.log(values);
  }

  return (
    <div className="flex flex-col space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row justify-between gap-6"
        >
          <div className="flex flex-col space-y-4 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className="max-w-2xl"
                      {...field}
                      placeholder="Enter a title"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="max-w-2xl">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={category} key={useId()}>
                          {category}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-w-2xl"
                      {...field}
                      placeholder="Enter a description"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ItemsList items={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className=" place-self-end md:place-self-auto w-fit"
          >
            Submit <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
