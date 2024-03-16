import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const cursorParam = searchParams.get("cursor");

  if (!cursorParam) {
    return NextResponse.json(
      { error: "Invalid request query" },
      { status: 400 }
    );
  }

  const cursor = parseInt(cursorParam);

  const lists = await prisma.list.findMany({
    orderBy: [
      { likes: "desc" },
      { date: "desc" },
      { comments: { _count: "desc" } },
    ],
    take: 3,
    skip: cursor == 0 ? cursor : (cursor - 1) * 3,
  });

  return Response.json(lists);
}
