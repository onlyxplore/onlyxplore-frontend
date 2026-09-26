import { auth } from "./auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userRole = (req.auth as any)?.user?.role || (req.auth as any)?.role;
  const isLoggedIn = !!req.auth && userRole === "ADMIN";

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
