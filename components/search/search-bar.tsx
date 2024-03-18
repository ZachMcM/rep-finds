"use client";

import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandInput } from "../ui/command";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { List } from "@prisma/client";
import { ListResult } from "./list-result";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const router = useRouter()

  const {
    data: searchResults,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["list-search"],
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

  const request = debounce(async () => {
    refetch();
  }, 150);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  function resetFunc() {
    setOpen(false)
    setQuery("")
    debounceRequest()
  }

  function goToSearchPage(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter" && open && searchResults && searchResults.length > 0) {
      router.push(`/search?query=${query}`)
      resetFunc()
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="flex justify-start items-center w-full max-w-xs md:max-w-xs lg:max-w-lg font-medium text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 mr-2 " />
        Search for a list...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onKeyDown={goToSearchPage}
          onValueChange={(query) => {
            setQuery(query);
            debounceRequest();
          }}
          placeholder="Search for a list or item..."
        />
        {isLoading ? (
          <div className="py-6 text-center text-sm w-full flex justify-center items-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : searchResults && searchResults.length > 0 ? (
          <div className="flex flex-col m-2">
            {searchResults?.map((list) => (
              <ListResult resetFunc={resetFunc} list={list} />
            ))}
          </div>
        ) : (
          <CommandEmpty>No results</CommandEmpty>
        )}
      </CommandDialog>
    </>
  );
}
