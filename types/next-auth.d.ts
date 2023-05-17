import { User as ZodUser } from "lib/zod";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
  interface User extends ZodUser {}
}
declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
