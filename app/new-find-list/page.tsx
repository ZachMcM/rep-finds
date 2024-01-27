import { NewListForm } from "@/components/list-creation/new-list-form"
import { NewListFormProvider } from "@/components/list-creation/new-list-form-provider"
import { auth, currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function NewFindList() {
  const { userId } : { userId: string | null } = auth()

  if (userId == null) {
    redirect("/")
  }

  return (
    <div className="container md:mx-8 grid grid-cols-1 gap-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold">New List</h1>
        <p className="text-muted-foreground">Create a new rep finds list</p>
      </div>
      <div className="border rounded-lg w-full h-full p-6 md:p-10 flex flex-col space-y-8">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Add List</h1>
          <p className="text-muted-foreground text-sm">Create a new rep finds list</p>
        </div>
        <NewListFormProvider>
          <NewListForm/>
        </NewListFormProvider>
      </div>
    </div>
  )
}