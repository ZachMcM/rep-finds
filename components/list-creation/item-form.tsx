"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
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

export type QueryItem = { name: string; imageUrl: string; id: string };

export const itemFormSchema = z.object({
  name: z.string(),
  imageUrl: z.string().url(),
  price: z.number().nonnegative({ message: "Must be a valid price" }),
  pandabuyLink: z.string().startsWith("https://www.pandabuy.com/", {
    message: "Must be a valid Pandabuy link",
  }),
});

export function ItemForm() {
  const [currItem, setCurrItem] = useState<QueryItem>();

  const [itemQuery, setItemQuery] = useState("");

  const [open, setOpen] = useState(false);

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
        `${process.env.NEXT_PUBLIC_URL}/api/items?query=${itemQuery}`
      );
      const data = await query.json();
      console.log(data);
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-fit">
          Add Item <Plus className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an item</DialogTitle>
          <DialogDescription>
            Add an item to your reps find list
          </DialogDescription>
        </DialogHeader>
        <Popover open={open} onOpenChange={setOpen} modal={true}>
          <PopoverTrigger asChild>
            <div className="w-full flex justify-center p-2 border rounded-md hover:bg-accent cursor-pointer">
              {currItem ? (
                <div className="flex justify-center items-center gap-4">
                  <Image
                    src={currItem.imageUrl}
                    alt={currItem.name}
                    width={75}
                    height={75}
                  />
                  <p className="font-medium text-sm">{currItem.name}</p>
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
                  console.log(search);
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
                          setCurrItem(item);
                          setOpen(false);
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
                          <p className="font-medium text-sm">{item.name}</p>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
      </DialogContent>
    </Dialog>
  );
}
