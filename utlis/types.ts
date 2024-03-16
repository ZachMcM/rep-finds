import { List, Prisma } from "@prisma/client";

export type UserExtended = {
  id: string;
  username: string;
  imageUrl: string;
  lists: List[];
};

export type UserReduced = {
  id: string;
  username: string;
  imageUrl: string;
}

export type ListExtended = Prisma.ListGetPayload<{
  include: {
    items: true;
    comments: true
  };
}>;

export const categoryArray = ["All", "Mixed", "Tops", "Bottoms", "Shoes", "Outerwear", "Accessories"] as const
export type Category = typeof categoryArray[number]

export const sortArray = ["Lowest", "Highest"] as const 
export type Sort = typeof sortArray[number]
