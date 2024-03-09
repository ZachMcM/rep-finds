"use client";

import { ItemCard } from "@/components/lists/item-card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ListExtended } from "@/utlis/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

  return (
    <div className="container md:mx-8 grid grid-cols-1 gap-8">
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
      <div className="flex gap-4 items-center">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search..."
        />
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
              .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
              .map((item) => <ItemCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
