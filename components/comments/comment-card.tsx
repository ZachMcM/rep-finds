"use client";

import { Comment } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { convertUser } from "@/utlis/convert-user";
import Link from "next/link";
import { daysAgo } from "@/utlis/days-ago";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { useAuth } from "@clerk/nextjs";

export function CommentCard({
  comment,
  listId,
}: {
  comment: Comment;
  listId: string;
}) {
  const user = convertUser(comment.user);

  const { userId } = useAuth();

  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: async (): Promise<Comment> => {
      const res = await fetch(`/api/lists/${listId}/comments/${comment.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lists", { id: listId }],
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error trying to delete the comment",
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <Link
            href={`users/${user.id}`}
            className="flex items-center gap-3 hover:opacity-80 duration-500"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback />
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link
              href={`users/${user.id}`}
              className="flex items-center gap-3 hover:opacity-80 duration-500 font-semibold text-sm"
            >
              {user.username}
            </Link>
            <p>{comment.content}</p>
          </div>
        </div>
        {user.id == userId && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => deleteComment()}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      <p className="text-muted-foreground text-xs font-medium">
        {daysAgo(new Date(comment.date))}
      </p>
    </div>
  );
}
