"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { ThemeButton } from "./theme-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sidebar } from "./sidebar";
import { SearchBar } from "../search/search-bar";

export function Navbar() {
  const { userId, sessionId, isLoaded } = useAuth();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex gap-4 md:gap-0 justify-between items-center p-4 md:px-10">
        <div className="hidden md:flex flex-row items-center gap-4 lg:gap-8">
          <Link href="/" className="font-bold">
            <p>Rep Finds</p>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            {userId && sessionId && (
              <Link
                href={`/users/${userId}`}
                className="text-muted-foreground hover:opacity-70 text-sm duration-300"
              >
                My Lists
              </Link>
            )}
          </div>
        </div>
        <Sidebar />
        <SearchBar />
        <div className="grid grid-flow-col gap-4 items-center">
          {isLoaded && userId && sessionId ? (
            <>
              {" "}
              <Link href="/new-find-list" className="hidden md:block">
                <Button>
                  New List
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          )}
          <ThemeButton />
        </div>
      </div>
    </div>
  );
}
