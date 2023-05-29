import prisma from "prisma/prisma";
import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { CustomError } from "@/lib/utils";
import { JWT } from "next-auth/jwt";
import { User } from "@/lib/zod";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma as any), // Temporary fix for https://github.com/prisma/prisma/issues/16117
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "string" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials, _req) {
        try {
          if (!credentials) return null;
          const user = await prisma.user
            .findUniqueOrThrow({
              where: {
                email: credentials.email,
              },
              select: {
                id: true,
                email: true,
                name: true,
                password: true,
                role: true,
              },
            })
            .catch((error) => {
              throw CustomError(error, 400);
            });
          if (!user) throw CustomError("User not found", 404);
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            }; // this is a temporary fix for an issue with NextAuth: https://github.com/nextauthjs/next-auth/issues/2701
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }: { token: JWT; user: User }) {
      // const dbUser = await prisma.user.findUnique({
      //   where: {
      //     email: token.user.email,
      //   },
      //   select: {
      //     id: true,
      //     email: true,
      //     name: true,
      //     role: true,
      //   },
      // });
      const dbUser = null; //TEMP
      if (!dbUser) {
        if (user) {
          token.user = { ...user };
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...token.user,
        },
      };
    },
  },
};
