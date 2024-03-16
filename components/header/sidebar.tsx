"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

export function Sidebar() {
  const { userId, sessionId } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden">
        <Menu className="" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="flex flex-col gap-4 p-4">
          <Link href="/" onClick={() => setOpen(false)}>
            {" "}
            <p className="font-bold">Rep Finds</p>
          </Link>
          <Link href="/new-find-list" 
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:opacity-70 text-sm duration-300"
          >
            {" "}
              New List
          </Link>
          {userId && sessionId && (
            <Link
              href={`/users/${userId}`}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:opacity-70 text-sm duration-300"
            >
              My Account
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
