import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "./lib/session";

// Protected routes
const protectedRoutes = ["/dashboard", "/admin"];

// Public routes
const publicRoutes = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("session")?.value;
    const session = await verifyToken(token);

    const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
    const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isPublic && session) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Logged in, but not an admin, trying to reach /admin
    if (pathname.startsWith("/admin") && session && session.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();  //let them through
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}