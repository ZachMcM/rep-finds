import prisma from "@/prisma/prisma"

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