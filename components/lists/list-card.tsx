"use client";

import { List } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { LikeButton } from "./like-button";
import { daysAgo } from "@/utlis/days-ago";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { convertUser } from "@/utlis/convert-user";

export function ListCard({ list }: { list: List }) {
  const { isLoaded, isSignedIn, userId } = useAuth();

  const user = convertUser(list.user)

  return (
    <div className="relative hover:opacity-80 duration-300 h-full w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <div className="flex justify-end pb-4 z-50">
            {isLoaded && (
              <LikeButton list={list} isSignedIn={isSignedIn} userId={userId} />
            )}
          </div>
          <Link
            href={`users/${list.userId}`}
            className="flex items-center gap-2 hover:opacity-80 duration-500 z-10"
          >
            <Avatar className="w-6 h-6">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback />
            </Avatar>
            <p className="text-sm font-semibold">{user.username}</p>
          </Link>
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
        <CardFooter>
          <p className="text-xs font-medium text-muted-foreground">{daysAgo(new Date(list.date))}</p>
        </CardFooter>
      </Card>
      <Link
        href={`/lists/${list.id}`}
        className="hover:opacity-80 duration-300 absolute inset-0"
      />
    </div>
  );
}
