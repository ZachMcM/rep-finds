import { NewListFormValues } from "@/components/list-creation/new-list-form-provider";
import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return Response.json({ status: 401, error: "Unauthenticated" })
  }

  const body = await request.json() as {
    list: NewListFormValues
  } | null

  console.log("body: %s\n userId: %s", body, userId)

  if (!body) {
    return Response.json({ status: 400, error: "Invalid request body" })
  }

  const list = body.list
  const listItems = list.items.map((item) => (
    {
      name: item.product.name,
      imageUrl: item.product.imageUrl,
      price: item.price as number,
      pandabuyUrl: item.pandabuyLink,
      userId: userId,   
    }
  ))


  const newList = await prisma.list.create({
    data: {
      userId: userId,
      title: list.title,
      category: list.category,
      description: list.description,
      items: {
        createMany: {
          data: listItems
        }
      }
    }
  })

  console.log(newList)
  return Response.json(newList)

}