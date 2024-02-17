"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserExtended } from "@/utlis/types";
import { useQuery } from "@tanstack/react-query";

export default function User({ params }: { params: { id: string } }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["users", { userId: params.id }],
    queryFn: async (): Promise<UserExtended> => {
      const res = await fetch(`/api/users/${params.id}`);
      if (!res.ok) {
        throw new Error("There was an error loading the data");
      }
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="container md:mx-8 grid grid-cols-1 gap-8">
      <div className="flex items-center space-x-4">
        {isLoading ? (
          <Skeleton className="h-12 w-12 rounded-full" />
        ) : (
          <Avatar>
            <AvatarImage src={user?.imageUrl} alt="avatar" />
            <AvatarFallback />
          </Avatar>
        )}
        {isLoading ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          <h3 className="font-bold text-xl">{user?.username}</h3>
        )}
      </div>
    </div>
  );
}
