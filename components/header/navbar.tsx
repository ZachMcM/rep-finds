import { UserButton } from "@clerk/nextjs";
import { ThemeButton } from "./theme-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <div className="w-full flex justify-between items-center border-b py-4 px-10">
      <h3 className="text-lg font-bold">Rep Finds</h3>
      <div className="grid grid-flow-col gap-4 items-center">
        <Link href="/new-find-list">
          <Button>Post a find list <ArrowRight className="ml-2 h-4 w-4"/> </Button>
        </Link>
        <ThemeButton/>
        <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
  );
}
