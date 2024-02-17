import { List } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function ListCard({ list }: { list: List}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{list.title}</CardTitle>
        <CardDescription>{list.description}</CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
    </Card>
  )
}