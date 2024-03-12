import { List } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { ToastAction } from "../ui/toast";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { cn } from "@/lib/utils";

export function LikeButton({
  list,
  isSignedIn,
  userId,
  classname,
  textSize,
}: {
  list: List;
  isSignedIn: boolean;
  userId: string | null | undefined;
  classname?: string;
  textSize?: string;
}) {
  function getInitialLike() {
    if (!isSignedIn) {
      return false;
    }

    for (const like of list.likes) {
      if (like == userId) {
        return true;
      }
    }

    return false;
  }

  const initialLike = getInitialLike();

  const [count, setCount] = useState(list.likes.length);
  const [liked, setLiked] = useState(initialLike);

  const { mutate: updateLikes } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/lists/${list.id}/likes`, {
        method: "PATCH",
      });

      if (!res.ok) {
        throw new Error("There was an error updating the likes");
      }

      const data = await res.json();
      return data;
    },
  });

  function handleLikeUpdate() {
    if (isSignedIn) {
      if (liked) {
        setCount(count - 1);
      } else {
        setCount(count + 1);
      }

      setLiked(!liked);
      updateLikes();
    } else {
      toast({
        description: "You must be signed in to like",
        action: (
          <Link href="/signin">
            <ToastAction altText="sign in">Sign In</ToastAction>
          </Link>
        ),
      });
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => handleLikeUpdate()}
        className={cn("hover:opacity-80 duration-500 z-10 h-5 w-5", classname)}
      >
        {liked ? (
          <TbHeartFilled className="text-primary w-full h-full" />
        ) : (
          <TbHeart className="w-full h-full" />
        )}
      </button>
      <p className={cn("font-medium", !textSize ? "text-sm" : textSize)}>
        {count} Like{count != 1 && "s"}
      </p>
    </div>
  );
}
