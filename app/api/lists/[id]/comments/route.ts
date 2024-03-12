import prisma from "@/prisma/prisma"
import { UserExtended } from "@/utlis/types"
import { auth, clerkClient } from "@clerk/nextjs"

export async function POST({ params }: { params: { id: string }}, req: Request) {
  const listId = params.id
  const { content } = await req.json() as { content?: string | null }

  const { userId } = auth()

  if (!userId) {
    return Response.json( { error: "Unauthenticated" }, { status: 401 });
  }
  
  const user = await clerkClient.users.getUser(userId)

  if (!user) {
    return Response.json({ status: 401, error: "Unauthenticated" });
  }

  if (!content) {
    return Response.json({ status: 400, error: "Inavlid comment content" });
  }

  const comment = await prisma.comment.create({
    data: {
      listId,
      user: {
        id: userId,
        username: user.username,
        imageUrl: user.imageUrl
      },
      userId,
      content
    }
  })

  return Response.json(comment)
}