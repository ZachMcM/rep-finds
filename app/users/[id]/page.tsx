"use client";

import { ListCard } from "@/components/lists/list-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Category, UserExtended, categoryArray } from "@/utlis/types";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useId, useState } from "react";

export default function User({ params }: { params: { id: string } }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["users", { userId: params.id }],
    queryFn: async (): Promise<UserExtended> => {
      const res = await fetch(`/api/users/${params.id}`);
      if (!res.ok) {
        throw new Error("There was an error loading the data");
      }
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");

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
          <h3 className="font-bold text-2xl">{user?.username}</h3>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <Input
          className=" w-full"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search..."
        />
        <Select
          value={category}
          onValueChange={(s: Category) => setCategory(s)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue>{category}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {categoryArray.map((category) => (
                <SelectItem id={useId()} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        Array(3)
          .fill("")
          .map((s) => (
            <Skeleton key={crypto.randomUUID()} className="h-[300px] w-full" />
          ))
      ) : user?.lists.length == 0 ? (
        <Alert className="w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>
            There are currently no lists here!
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {user?.lists
            .filter(
              (list) =>
                (list.title.toLowerCase().includes(query.toLowerCase()) ||
                  list.description
                    .toLowerCase()
                    .includes(query.toLowerCase())) &&
                category == "All" ? true :
                list.category == category
            )
            .map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
        </div>
      )}
    </div>
  );
}
