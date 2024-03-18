import { convertUser } from "@/utlis/convert-user";
import { List } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TbHeart } from "react-icons/tb";
import { Dispatch, SetStateAction } from "react";

export function ListResult({
  list,
  resetFunc
}: {
  list: List;
  resetFunc: Function
}) {
  const user = convertUser(list.user);

  return (
    <div
      className="relative p-4 rounded-sm hover:bg-secondary duration-200"
      onClick={() => resetFunc()}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2.5">
          <Link
            href={`users/${list.userId}`}
            className="flex items-center gap-2 hover:opacity-80 duration-500 z-10"
          >
            <Avatar className="w-6 h-6">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback />
            </Avatar>
            <p className="text-sm font-semibold">{user.username}</p>
          </Link>
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground font-medium">
              {list.category}
            </p>
            <p className="text-accent-foreground font-semibold">{list.title}</p>
            <p className="text-muted-foreground text-sm font-medium">
              {list.description}
            </p>
          </div>
        </div>
        <p className="text-sm font-medium flex items-center">
          <TbHeart className="h-4 w-4 mr-2" />
          {list.likes.length} Like{list.likes.length != 1 && "s"}
        </p>
      </div>
      <Link
        href={`/lists/${list.id}`}
        className="hover:opacity-80 duration-300 absolute inset-0"
      />
    </div>
  );
}
