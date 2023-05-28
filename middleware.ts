import { routeIsHomeOrArticle, routeIsLoginOrSignup } from "@/lib/utils";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const pathname = request.nextUrl.pathname;
    const session = request.nextauth.token;
    if (session && routeIsLoginOrSignup(pathname)) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (token) return true;
        if (
          routeIsLoginOrSignup(req.nextUrl.pathname) ||
          routeIsHomeOrArticle(req.nextUrl.pathname)
        )
          return true;
        return false;
      },
    },
  }
);

export const config = {
  matcher: "/((?!api|_next/static|_next/image|background|favicon.ico).*)",
};
