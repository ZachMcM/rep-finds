import { List } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";

export function ListCard({ list }: { list: List }) {
  return (
    <Link href={`/lists/${list.id}`} className="hover:opacity-80 duration-300">
      <Card>
        <CardHeader>
          <p className="text-muted-foreground text-xs font-medium">
            {list.category}
          </p>
          <CardTitle>{list.title}</CardTitle>
          <CardDescription>{list.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            {list.coverImages.map((image, i) => (
              <div className="relative h-36 w-36">
                <Image
                src={image}
                fill
                alt="cover image"
                className={i == 0 ? "rotate-45" : "-rotate-45 -scale-x-100"}
              />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
