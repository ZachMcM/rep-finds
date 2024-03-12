import prisma from "@/prisma/prisma"
import { auth } from "@clerk/nextjs"
import { List } from "@prisma/client"
import { list } from "postcss"

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  const listId = params.id
  const { userId } = auth()

  if (!userId) {
    return Response.json({ status: 401, error: "You must be signed in to update a like" });
  }

  const list = await prisma.list.findUnique({
    where: {
      id: listId
    }
  })

  if (!list) {
    return Response.json({ status: 400, error: "No list found" });
  }

  let liked = false

  for (const like of list.likes) {
    if (like == userId) {
      liked = true
    }
  }

  let updatedList = list
  let updatedLikes = list.likes

  if (liked) {
    updatedLikes = list.likes.filter((like) => like != userId)
  } else {
    updatedLikes.push(userId)
  }

  updatedList = await prisma.list.update({
    where: {
      id: listId
    },
    data: {
      likes: updatedLikes
    }
  })

  return Response.json(updatedList)
}