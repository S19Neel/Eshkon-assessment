import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/api/protected")) {
      if (token?.role !== "PUBLISHER" && token?.role !== "EDITOR") {
        return new NextResponse("Forbidden: Insufficient privileges", {
          status: 403,
        });
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/studio/:path*", "/preview/:path*", "/api/protected/:path*"],
};
