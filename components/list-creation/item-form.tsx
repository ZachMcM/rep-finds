"use client";

import { Plus } from "lucide-react";
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

export type QueryItem = { name: string; imageUrl: string, id: string };

export const itemFormSchema = z.object({
  name: z.string(),
  imageUrl: z.string().url(),
  price: z.number().nonnegative({ message: "Must be a valid price" }),
  pandabuyLink: z
    .string()
    .startsWith("https://www.pandabuy.com/", {
      message: "Must be a valid Pandabuy link",
    }),
});

export function ItemForm() {
  const [currItem, setCurrItem] = useState<QueryItem>();

  const [itemQuery, setItemQuery] = useState("");

  const [open, setOpen] = useState(false);

  const { data: searchResults, refetch } = useQuery({
    queryKey: ["item-search"],
    queryFn: async () => {
      if (!itemQuery) {
        return [];
      }

      const query = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/items?query=${setItemQuery}`
      );
      const data = await query.json();
      console.log(data);
      return data as QueryItem[];
    },
  });

  // prevents the async call from happening continuously

  const request = debounce(async () => {
    refetch();
  }, 3000);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="aspect-square border border-dashed rounded-md cursor-pointer flex items-center justify-center duration-500 hover:opacity-90 bg-background">
        <Plus className="h-12 w-12" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an item</DialogTitle>
          <DialogDescription>
            Add an item to your reps find list
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="">

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
