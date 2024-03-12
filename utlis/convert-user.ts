import { Prisma } from "@prisma/client";
import { UserReduced } from "./types";

export function convertUser(json: Prisma.JsonValue | undefined): UserReduced {
  return (JSON.parse(JSON.stringify(json)) as UserReduced)
}