/*
The idea: Proxy (AKA Middleware) is code that runs before a request reaches your page.
Picture a security guard at the building entrance.
Every visitor passes the guard first, and the guard can let them through,
send them elsewhere (redirect), or tweak the request (add headers).

- Proxy runs on every matched request, before rendering.
- It can only do quick things: redirect, rewrite, set headers/cookies. It’s not a place for database calls or heavy work.
- matcher controls where it runs.

Browser request → Proxy → Page / Route
                      ↓
                 (or redirect)
 */

import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    // console.log("Middleware ran for: ", request.nextUrl.pathname);

    const { pathname } = request.nextUrl;
    if (pathname === "/old-page") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();  //let them through
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}