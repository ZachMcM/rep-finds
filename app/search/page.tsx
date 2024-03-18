"use client";

import { ListCard } from "@/components/lists/list-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Category, categoryArray } from "@/utlis/types";
import { List } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const router = useRouter();

  if (!query) {
    router.push("/");
    return;
  }

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", { query }],
    queryFn: async (): Promise<List[]> => {
      if (!query || query == "" || query == " " || query == "  ") {
        return [];
      }

      const res = await fetch(`/api/lists?query=${query}`);
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  const [category, setCategory] = useState<Category>(categoryArray[0]);

  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col gap-6 mt-10 lg:w-2/3">
        <div className="flex flex-col">
          <p>Search results for</p>
          <p className="text-xl font-bold">
            {query} {searchResults && `(${searchResults.length})`}
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-8 w-full">
          <div className="flex flex-col gap-6 w-full">
            {!isLoading && searchResults ? (
              searchResults.filter((list) =>
                category == "All" ? true : category == list.category
              ).length > 0 ? (
                searchResults
                  .filter((list) =>
                    category == "All" ? true : category == list.category
                  )
                  .map((list) => <ListCard list={list} />)
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No Results</AlertTitle>
                  <AlertDescription>
                    No are no results found with that search and filter. Try
                    changing the filter or using another search term.
                  </AlertDescription>
                </Alert>
              )
            ) : (
              Array(9)
                .fill("")
                .map((_) => (
                  <Skeleton
                    key={crypto.randomUUID()}
                    className="h-[300px] w-full"
                  />
                ))
            )}
          </div>
          <div className="flex flex-col gap-6 md:w-1/2">
            <Select
              value={category}
              onValueChange={(s: Category) => setCategory(s)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{category}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categoryArray.map((category) => (
                    <SelectItem id={useId()} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
