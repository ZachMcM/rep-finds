"use client";

import { ItemCard } from "@/components/lists/item-card";
import { LikeButton } from "@/components/lists/like-button";
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
import { ListExtended, Sort, sortArray } from "@/utlis/types";
import { useAuth } from "@clerk/nextjs";
import { List } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Check, Share, Share2 } from "lucide-react";
import { use, useState } from "react";

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

  const { userId, isSignedIn, isLoaded } = useAuth()

  async function shareList() {
    try {
      await navigator.share({
        title: "Check out this rep list",
        text: `Check out ${list?.title} on Rep Finds`,
        url: process.env.NEXT_PUBLIC_URL + "/lists/" + list?.id
      })
    } catch (err) {
      navigator.clipboard.writeText(process.env.NEXT_PUBLIC_URL + "/lists/" + list?.id)
      toast({
        description: <p className="flex items-center">Link successfully copied to clipboard <Check className="w-4 h-4 ml-2"/></p>
      })
    }
  }

  return (
    <div className="container md:mx-8 grid grid-cols-1 gap-8">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[500px]" />
            </>
          ) : (
            <>
              <h3 className="font-bold text-2xl">{list?.title}</h3>
              <p className="text-muted-foreground font-medium">
                {list?.description}
              </p>
            </>
          )}
        </div>
        {
          !isLoading && isLoaded &&
          <div className="flex gap-4 items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                shareList()
              }}
            >
              <Share2 className="h-5 w-5"/>
            </Button>
            <LikeButton list={list as List} userId={userId} isSignedIn={isSignedIn}/>
          </div>
        }
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
