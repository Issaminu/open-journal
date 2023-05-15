import prisma from "prisma/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
          },
        });
        if (!user) return null;
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (isMatch) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          } as any; // this is a temporary fix for an issue with NextAuth: https://github.com/nextauthjs/next-auth/issues/2701
        }
      },
    }),
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
