import prisma from "@/prisma/prisma"
import { clerkClient } from "@clerk/nextjs"

export async function GET(request: Request, { params }: { params: { id: string }}) {
  const user = await clerkClient.users.getUser(params.id)

  if (user) {
    const lists = await prisma.list.findMany({
      where: {
        userId: user.id
      }
    })
    return Response.json({
      id: user.id,
      username: user.username,
      imageUrl: user.imageUrl,
      lists: lists
    })
  } else {
    return Response.json({ error: "Invalid user id"}, { status: 400 })
  }
}