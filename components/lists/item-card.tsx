import { Item } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { linkShortener } from "@/utlis/link-shortener";
import Image from "next/image";
import { Badge } from "../ui/badge";

export function ItemCard({ item }: { item: Item }) {
  return (
    <Link href={item.link} className="hover:opacity-80 duration-300 h-full">
      <Card className="h-full">
        <CardHeader>
          <div className="flex justify-end pb-6">
            <div className="p-2 text-xs font-bold bg-secondary rounded-md">${String(item.price)}</div>
          </div>
          <div className="mb-6 w-full flex justify-center items-center">
            <Badge className="w-fit capitalize">{item.category}</Badge>
          </div>
          <CardTitle className="text-xl text-center">{item.name}</CardTitle>
          <CardDescription className="text-center break-words">{linkShortener(item.link)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex ite justify-center">
            <Image
              src={item.imageUrl}
              height={175}
              width={175}
              alt={item.name}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
