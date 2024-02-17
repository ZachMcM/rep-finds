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
import { ArrowRight, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";
import { useWatch } from "react-hook-form";
import { ItemForm } from "./item-form";

export function NewListForm() {
  const form = useNewListForm();

  const { userId } = useAuth();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate: submitList, isPending: submissionPending } = useMutation({
    mutationFn: async (values: NewListFormValues) => {
      const req = await fetch(`/api/lists`, {
        method: "POST",
        body: JSON.stringify({
          list: values,
        }),
      });

      const res = await req.json();
      if (!req.ok) {
        throw new Error("There was an error creating the list")
      }
      console.log(res);
      return res;
    },
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["users", { userId: userId }],
      });

      toast({
        description: "Successfully created the list!",
      });
    },
    onError: (err) => {
      console.log(err);
      toast({
        description: "There was an error creating the list. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: NewListFormValues) {
    console.log(values);
    console.log("Wrong on submit");
    submitList(values);
  }

  return (
    <div className="flex flex-col space-y-6">
      <ItemForm />
      <Form {...form}>
        <form
          id="list-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="space-y-6">
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
          </div>
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
          <Button
            type="submit"
            form="list-form"
            className="place-self-end w-fit"
          >
            Submit{" "}
            {submissionPending ? (
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4 ml-2" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
