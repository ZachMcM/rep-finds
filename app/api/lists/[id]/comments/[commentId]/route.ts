import prisma from "@/prisma/prisma"
import { auth } from "@clerk/nextjs"

export async function DELETE({ params }: { params: { id: string, commentId: string }}, req: Request) {
  const { userId } = auth()

  if (!userId) {
    return Response.json({error: "Unauthorized request"}, { status: 401 })
  }

  const comment = await prisma.comment.delete({
    where: {
      userId,
      id: params.commentId,
      listId: params.id
    }
  })

  return Response.json(comment)
}