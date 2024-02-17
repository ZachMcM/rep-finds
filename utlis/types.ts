import { List } from "@prisma/client"

export type UserExtended = {
  id: string,
  username: string,
  imageUrl: string,
  lists: List[]
}