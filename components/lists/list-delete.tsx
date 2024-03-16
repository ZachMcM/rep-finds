"use client";

import { useRouter } from "next/navigation";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { Check } from "lucide-react";

export function ListDelete({ listId }: { listId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteList, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/lists/${listId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lists", { id: listId }],
      });
      toast({
        description: (
          <p className="flex items-center">
            Successfully deleted list <Check className="h-4 w-4 ml-2" />
          </p>
        ),
      });
      router.push("/");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error trying to delete the list",
      });
    },
  });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this list.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => deleteList()}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
