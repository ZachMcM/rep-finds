"use client";

import { Plus, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";

import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { useNewListForm } from "./new-list-form-provider";

export type QueryItem = { name: string; imageUrl: string; id: string };

export const itemFormSchema = z.object({
  product: z.object({
    name: z.string(),
    imageUrl: z.string().url(),
    id: z.string(),
  }),
  price: z.coerce
    .number({ required_error: "Must be a valid price" })
    .nonnegative()
    .min(0.5, { message: "Price must be at least $0.50" })
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
});

export type ListFormItem = z.infer<typeof itemFormSchema>;

export function ItemForm() {
  const [itemQuery, setItemQuery] = useState("");

  const [popoverOpen, setPopoverOpen] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const primaryListForm = useNewListForm();

  // the form

  const form = useForm<ListFormItem>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      product: {
        name: "",
        imageUrl: "",
        id: "",
      },
      price: 0.5,
      link: "",
    },
  });

  // searching the api for the item

  const { data: searchResults, refetch } = useQuery({
    queryKey: ["item-search"],
    queryFn: async (): Promise<QueryItem[]> => {
      if (
        !itemQuery ||
        itemQuery == "" ||
        itemQuery == " " ||
        itemQuery == "  "
      ) {
        return [];
      }

      const query = await fetch(
        `/api/items?query=${itemQuery}`
      );
      const data = await query.json();
      return data;
    },
  });

  // prevents the async call from happening continuously

  const request = debounce(async () => {
    refetch();
  }, 150);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  function onSubmit(values: ListFormItem) {
    console.log(values);

    const currItems = primaryListForm.getValues("items");

    if (currItems == undefined) {
      primaryListForm.setValue("items", [values]);
    } else {
      currItems.push(values);
      primaryListForm.setValue("items", currItems);
    }

    form.reset();
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-fit">
          Add Item <Plus className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md md:max-w-lg rounded-sm">
        <DialogHeader>
          <DialogTitle>Add an item</DialogTitle>
          <DialogDescription>
            Add an item to your reps find list
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            id="item-form"
          >
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item</FormLabel>
                  <FormControl>
                    <Popover
                      open={popoverOpen}
                      onOpenChange={setPopoverOpen}
                      modal={true}
                    >
                      <PopoverTrigger asChild>
                        <div className="w-full flex justify-center text-sm font-medium p-2 border rounded-md hover:bg-accent cursor-pointer">
                          {field.value.name != "" &&
                          field.value.imageUrl != "" ? (
                            <div className="flex justify-center items-center gap-4">
                              <Image
                                src={field.value.imageUrl}
                                alt={field.value.name}
                                width={75}
                                height={75}
                              />
                              <p className="font-medium text-sm">
                                {field.value.name}
                              </p>
                            </div>
                          ) : (
                            "Select an item..."
                          )}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-[400px]">
                        <Command shouldFilter={false}>
                          <CommandInput
                            value={itemQuery}
                            onValueChange={(search) => {
                              setItemQuery(search);
                              debounceRequest();
                            }}
                            placeholder="Search for an item..."
                          />
                          <ScrollArea className="h-[250px]">
                            <CommandEmpty>No item found.</CommandEmpty>
                            <CommandGroup>
                              {searchResults &&
                                searchResults.map((item) => (
                                  <CommandItem
                                    key={item.id}
                                    value={item.id}
                                    onSelect={() => {
                                      form.setValue("product", {
                                        name: item.name,
                                        imageUrl: item.imageUrl,
                                        id: item.id,
                                      });
                                      setPopoverOpen(false);
                                      setItemQuery("");
                                      debounceRequest();
                                    }}
                                    className="cursor-pointer"
                                  >
                                    <div className="flex items-center gap-4">
                                      <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        width={75}
                                        height={75}
                                      />
                                      <p className="font-medium text-sm">
                                        {item.name}
                                      </p>
                                    </div>
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </ScrollArea>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Price (USD)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.pandabuy.com/" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" form="item-form">
              Add <PlusCircle className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
