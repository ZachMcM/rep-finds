import { MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Comment } from "@prisma/client";
import { NewComment } from "./new-comment";
import { CommentCard } from "./comment-card";

export function CommentsView({
  listId,
  comments,
}: {
  listId: string;
  comments: Comment[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="text-sm font-medium hover:opacity-80 duration-500 cursor-pointer flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" /> {comments.length} Comment
          {comments.length != 1 && "s"}
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-none md:max-w-md">
        <SheetHeader>
          <SheetTitle>Comments ({comments.length})</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <NewComment listId={listId} />
          <div className="flex flex-col gap-10 mt-14">
            {" "}
            {comments.map((comment) => (
              <CommentCard comment={comment} listId={listId} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
