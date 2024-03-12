"use client";

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
import { useAuth, useSession } from "@clerk/nextjs";
import { LikeButton } from "./like-button";

export function ListCard({ list }: { list: List }) {
  const { isLoaded, isSignedIn, userId } = useAuth();

  return (
    <div className="relative hover:opacity-80 duration-300 h-full">
      <Card className="h-full">
        <CardHeader>
          <div className="flex justify-end pb-4 z-50">
            {isLoaded && (
              <LikeButton list={list} isSignedIn={isSignedIn} userId={userId} />
            )}
          </div>
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
      <Link
        href={`/lists/${list.id}`}
        className="hover:opacity-80 duration-300 absolute inset-0"
      />
    </div>
  );
}
