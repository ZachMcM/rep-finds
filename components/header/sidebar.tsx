import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { navLinks } from "@/config/nav-links";
import Link from "next/link";

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="flex flex-col gap-4 p-4">
          <Link href="/">
            {" "}
            <p className="font-bold">Rep Finds</p>
          </Link>
          {navLinks.map((link) => (
            <Link href={link.href} className="hover:opacity-70 duration-300">
              {link.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
