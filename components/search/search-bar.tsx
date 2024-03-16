"use client";

import { useCallback, useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandInput } from "../ui/command";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { List } from "@prisma/client";
import { ListResult } from "./list-result";
import { Loader2 } from "lucide-react";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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

  return (
    <>
      <Button
        variant="outline"
        className="w-full max-w-xs md:max-w-xs lg:max-w-lg flex items-center justify-between p-4"
        onClick={() => setOpen(true)}
      >
        <p className="font-medium text-muted-foreground">
          Search for a list...
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
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
              <ListResult list={list} />
            ))}
          </div>
        ) : (
          <CommandEmpty>No results</CommandEmpty>
        )}
      </CommandDialog>
    </>
  );
}
