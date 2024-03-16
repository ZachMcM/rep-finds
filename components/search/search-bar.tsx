"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { List } from "@prisma/client";

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

  const { data: searchResults, refetch } = useQuery({
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
        className="w-full flex items-center justify-between p-4"
        onClick={() => setOpen(true)}
      >
        <p className="font-medium text-muted-foreground">
          Search for a list or item...
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
        {searchResults && searchResults.length > 0 ? (
          <div className="flex flex-col m-2">
            {searchResults?.map((list) => (
              <div
                className="px-2 py-1.5 rounded-sm text-sm text-accent-foreground hover:bg-secondary duration-200"
                key={list.id}
              >
                {list.title}
              </div>
            ))}
          </div>
        ) : (
          <CommandEmpty>No results</CommandEmpty>
        )}
      </CommandDialog>
    </>
  );
}