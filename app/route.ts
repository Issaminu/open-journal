import { NextRequest, NextResponse } from "next/server";

// This function doesn't get called anymore, as the permanent redirection is handled in next.config.js
export function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/home", req.url));
}
