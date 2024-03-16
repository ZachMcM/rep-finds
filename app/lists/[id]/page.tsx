"use client";

import { CommentsView } from "@/components/comments/comments-view";
import { ListMore } from "@/components/lists/list-more";
import { ItemCard } from "@/components/lists/item-card";
import { LikeButton } from "@/components/lists/like-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { convertUser } from "@/utlis/convert-user";
import { ListExtended, Sort, sortArray } from "@/utlis/types";
import { useAuth } from "@clerk/nextjs";
import { List } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Check, Share } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function List({ params }: { params: { id: string } }) {
  const { data: list, isLoading } = useQuery({
    queryKey: ["lists", { id: params.id }],
    queryFn: async (): Promise<ListExtended> => {
      const res = await fetch(`/api/lists/${params.id}`);
      if (!res.ok) {
        throw new Error("There was an error loading the list");
      }
      const data = await res.json();
      return data;
    },
  });

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>(sortArray[0]);

  const { userId, isSignedIn, isLoaded } = useAuth();

  async function shareList() {
    try {
      await navigator.share({
        title: "Check out this rep list",
        text: `Check out ${list?.title} on Rep Finds`,
        url: process.env.NEXT_PUBLIC_URL + "/lists/" + list?.id,
      });
    } catch (err) {
      navigator.clipboard.writeText(
        process.env.NEXT_PUBLIC_URL + "/lists/" + list?.id
      );
      toast({
        description: (
          <p className="flex items-center">
            Link successfully copied to clipboard{" "}
            <Check className="w-4 h-4 ml-2" />
          </p>
        ),
      });
    }
  }

  return (
    <div className="container md:mx-8 grid grid-cols-1 gap-8">
      <div className="w-full flex flex-col-reverse md:flex-row md:justify-between gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : (
              <Link
                href={`/users/${list?.userId}`}
                className="hover:opacity-80 duration-500"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={convertUser(list?.user).imageUrl}
                    alt="avatar"
                  />
                  <AvatarFallback />
                </Avatar>
              </Link>
            )}
            {isLoading ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              <Link
                href={`/users/${list?.userId}`}
                className="hover:opacity-80 duration-500"
              >
                <h3 className="font-semibold text-lg">
                  {convertUser(list?.user).username}
                </h3>
              </Link>
            )}
          </div>
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[500px]" />
            </>
          ) : (
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl md:text-2xl">{list?.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base font-medium">
                {list?.description}
              </p>
            </div>
          )}
        </div>
        {!isLoading && isLoaded && list && (
          <div className="flex gap-4 items-center">
            {userId == list.userId && <ListMore list={list} />}
            <CommentsView listId={list.id} comments={list.comments} />
            <LikeButton
              list={list as List}
              userId={userId}
              isSignedIn={isSignedIn}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                shareList();
              }}
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search..."
        />
        <Select value={sort} onValueChange={(e: Sort) => setSort(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort items" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort</SelectLabel>
              {sortArray.map((sort) => (
                <SelectItem value={sort}>{sort}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array(4)
              .fill("")
              .map((s) => (
                <Skeleton
                  key={crypto.randomUUID()}
                  className="h-[400px] w-full"
                />
              ))
          : list?.items
              .filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
              )
              .sort((b, a) =>
                sort == "Highest"
                  ? Number(a.price) - Number(b.price)
                  : Number(b.price) - Number(a.price)
              )
              .map((item) => <ItemCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
