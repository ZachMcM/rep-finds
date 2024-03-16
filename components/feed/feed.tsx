"use client";

import { List } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { Loader2 } from "lucide-react";
import { ListCard } from "../lists/list-card";

export function Feed({ initialData }: { initialData: List[] }) {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [],
    queryFn: async ({ pageParam }): Promise<List[]> => {
      const res = await fetch("/api/feed?cursor=" + pageParam);
      if (!res.ok) {
        throw new Error("There was an error loading your feed.");
      }
      const data = await res.json();
      console.log(data);
      return data;
    },
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log("getting next page");
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts: List[] = data?.pages.flatMap((page) => page) ?? initialData;

  return (
    <div className="flex-1 w-full h-full flex items-center flex-col gap-8">
      {posts.map((list, i) => {
        if (i === posts.length - 1) {
          return (
            <div ref={ref} key={list.id} className="w-full">
              <ListCard list={list} />
            </div>
          );
        } else {
          return <ListCard key={list.id} list={list} />;
        }
      })}
      {isFetchingNextPage && <Loader2 className="h-4 w-4 animate-spin" />}
    </div>
  );
}
