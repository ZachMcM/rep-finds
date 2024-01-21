import { auth, currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function NewFindList() {
  const { userId } : { userId: string | null } = auth()

  if (userId == null) {
    redirect("/")
  }

  return (
    <></>
  )
}