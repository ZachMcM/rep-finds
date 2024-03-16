"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { ThemeButton } from "./theme-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Sidebar } from "./sidebar";

export function Navbar() {
  const { userId, sessionId, isLoaded } = useAuth();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full  flex justify-between items-center py-4 px-10">
        <div className="hidden md:flex flex-row items-center gap-8">
          <Link href="/" className="font-bold">
            <p>Rep Finds</p>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            {userId && sessionId && (
              <Link
                href={`/users/${userId}`}
                className="text-muted-foreground hover:opacity-70 text-sm duration-300"
              >
                My Account
              </Link>
            )}
          </div>
        </div>
        <Sidebar />
        <div className="grid grid-flow-col gap-4 items-center">
          {isLoaded && userId && sessionId ? (
            <>
              {" "}
              <Link href="/new-find-list" className="hidden md:block">
                <Button>
                  Post a find list <ArrowRight className="ml-2 h-4 w-4" />{" "}
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
