import prisma from "@/prisma/prisma"
import { auth } from "@clerk/nextjs";

export async function GET(req: Request, { params }: { params: { id: string }}) {
  const id = params.id

  const list = await prisma.list.findUnique({
    where: {
      id
    },
    include: {
      items: true,
      comments: true
    }
  })

  if (!list) {
    return Response.json({ error: "No list found" }, { status: 400 });
  }

  return Response.json(list)
}

export async function DELETE(req: Request, { params }: { params: { id: string }}) {
  const id = params.id

  const { userId } = auth()

  if (!userId) {
    return Response.json({ error: "Unauthenticated request" }, { status: 401 });
  }
 
  const list = await prisma.list.delete({
    where: {
      id,
      userId,
    }
  })

  return Response.json(list)
}