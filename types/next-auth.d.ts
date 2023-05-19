import type { User as ZodUser } from "lib/zod";
import type { JWT } from "next-auth/jwt";
import type { DefaultSession } from "next-auth";
import type { Role } from "@/lib/utils";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & ZodUser;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: ZodUser;
  }
}
