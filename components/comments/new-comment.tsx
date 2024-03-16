"use client";

import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment } from "@prisma/client";
import { toast } from "../ui/use-toast";

export function NewComment({ listId }: { listId: string }) {
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: async (): Promise<Comment> => {
      console.log(`/api/lists/${listId}/comments`)
      const res = await fetch(`/api/lists/${listId}/comments`, {
        method: "POST",
        body: JSON.stringify({
          content: content,
        }),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lists", { id: listId }],
      });
      setContent("")
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error trying to add a comment",
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add comment..."
      />
      <Button 
        className="w-fit self-end"
        onClick={() => content && addComment()}
      >
        Add{" "}
        {!isPending ? (
          <PlusCircle className="h-4 w-4 ml-2" />
        ) : (
          <Loader2 className="h-4 w-4 ml-2 animate-spin" />
        )}
      </Button>
    </div>
  );
}
