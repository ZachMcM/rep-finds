import { List, Prisma } from "@prisma/client"

export type UserExtended = {
  id: string,
  username: string,
  imageUrl: string,
  lists: List[]
}

export type ListExtended = Prisma.ListGetPayload<{
  include: {
    items: true
  }
}>