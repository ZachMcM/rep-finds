import { clerkClient } from "@clerk/nextjs"

export async function GET(request: Request, { params }: { params: { id: string }}) {
  const user = await clerkClient.users.getUser(params.id)

  if (user) {
    return Response.json(user)
  } else {
    return Response.json({status: 401, error: "Invalid user id"})
  }
}