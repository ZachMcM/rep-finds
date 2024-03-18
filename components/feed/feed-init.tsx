"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { Feed } from "./feed";
import { List } from "@prisma/client";

export function FeedInit() {
  const { data: initialData, isLoading } = useQuery({
    queryFn: async (): Promise<List[]> => {
      const res = await fetch(`/api/feed?cursor=0`);
      const data = await res.json();
      return data;
    },
    queryKey: ["feed-init"],
    gcTime: 0
  });

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      {!isLoading && initialData ? (
        <Feed initialData={initialData} />
      ) : (
        Array(9).fill("").map((_) => <Skeleton key={crypto.randomUUID()} className="h-[300px] w-full" />)
      )}
    </div>
  );
}
