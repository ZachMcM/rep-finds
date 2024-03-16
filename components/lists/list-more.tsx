import { ListExtended } from "@/utlis/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { TbDots } from "react-icons/tb";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { ListDelete } from "./list-delete";

export function ListMore({ list }: { list: ListExtended }) {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <TbDots className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <AlertDialogTrigger>Delete</AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ListDelete listId={list.id} />
    </AlertDialog>
  );
}
