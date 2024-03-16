import { NewListFormValues } from "@/components/list-creation/new-list-form-provider";
import prisma from "@/prisma/prisma";
import { auth, clerkClient } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return Response.json({ status: 401, error: "Unauthenticated" });
  }

  const user = await clerkClient.users.getUser(userId);

  if (!user) {
    return Response.json({ status: 401, error: "Unauthenticated" });
  }

  const body = (await request.json()) as {
    list: NewListFormValues;
  } | null;

  console.log("body: %s\n userId: %s", body, userId);

  if (!body) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const list = body.list;

  const listItems = list.items.map((item) => ({
    name: item.product.name,
    imageUrl: item.product.imageUrl,
    price: item.price as number,
    link: item.link,
    userId: userId,
  }));

  let firstRand = Math.floor(Math.random() * list.items.length);
  let secondRand = 0;

  while (secondRand == firstRand) {
    secondRand = Math.floor(Math.random() * list.items.length);
  }

  const newList = await prisma.list.create({
    data: {
      user: {
        id: userId,
        username: user.username,
        imageUrl: user.imageUrl,
      },
      userId: userId,
      title: list.title,
      category: list.category,
      description: list.description,
      coverImages: [
        list.items[firstRand].product.imageUrl,
        list.items[secondRand].product.imageUrl,
      ],
      items: {
        createMany: {
          data: listItems,
        },
      },
    },
  });

  console.log("New List" + newList);
  return Response.json(newList);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ error: "Invalid query" }, { status: 400 });
  }

  console.log(query)

  const lists = await prisma.list.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive"
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          items: {
            some: {
              name: {
                contains: query,
                mode: "insensitive"
              },
            },
          },
        },
      ],
    },
    orderBy: [
      { likes: "desc" },
      { date: "desc" },
      { comments: { _count: "desc" } },
    ],
    take: 10,
  });

  console.log(lists)

  return Response.json(lists);
}
