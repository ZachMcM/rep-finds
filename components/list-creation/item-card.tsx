import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { ListFormItem } from "./item-form";
import Link from "next/link";
import { linkShortener } from "@/utlis/link-shortener";
import { X } from "lucide-react";
import { useNewListForm } from "./new-list-form-provider";

export function ItemCard({ item }: { item: ListFormItem }) {
  const primaryListForm = useNewListForm();

  return (
    <Card className="w-full relative">
      <CardContent>
        <div className="aspect-square w-full relative">
          <Image src={item.product.imageUrl} alt={item.product.name} fill />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-center">
            {item.product.name}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            ${" "}
            {item.price != undefined
              ? (Math.round(item.price * 100) / 100).toFixed(2)
              : 0.0}
          </p>
          <Link
            className="text-muted-foreground text-xs text-center hover:opacity-70 duration-300"
            href={item.link}
          >
            <p>{linkShortener(item.link)}</p>
          </Link>
        </div>
      </CardContent>
      <button
        className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full hover:opacity-70 duration-300"
        onClick={() => {
          const filteredItems = primaryListForm
            .getValues("items")
            .filter((otherItem) => otherItem.product.id != item.product.id);

          primaryListForm.setValue("items", filteredItems);

          console.log(primaryListForm.getValues("items"));
        }}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </Card>
  );
}
