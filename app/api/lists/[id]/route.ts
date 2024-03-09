import prisma from "@/prisma/prisma"

export async function GET(req: Request, { params }: { params: { id: string }}) {
  const id = params.id

  const list = await prisma.list.findUnique({
    where: {
      id
    },
    include: {
      items: true
    }
  })

  if (!list) {
    return Response.json({ status: 400, error: "No list found" });
  }

  return Response.json(list)
}