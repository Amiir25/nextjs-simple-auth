/*
Imagine you enter a music festival:
- SignJWT = the staff member who stamps a wristband for you at the entrance, using a special tamper-proof stamp only they have.
- jwtVerify = the security guard at each stage who checks your wristband is real and hasn’t expired.
- cookies = your wrist. It’s where the band is kept so you carry it everywhere without re-showing your ticket.

.setProtectedHeader({ alg: "HS256" })
.setIssuedAt()
.setExpirationTime("7d")
.sign(key);
*/

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.SESSION_SECRET);

export type SessionPayload = {
    username: string;
    role: "user" | "admin";
}


// Sign the token
export async function signToken(payload: SessionPayload) {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(key);
}


// Verify the token
export async function verifyToken(token: string | undefined) {
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
        return payload as unknown as SessionPayload;
    } catch {
        return null;
    }
}


// Sign + store in a cookie
export async function createSession(payload: SessionPayload) {
    const token = await signToken(payload);
    const cookieStore = await cookies();

    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    })
}


// Read the cookie and verify it
export async function getSession() {
    const cookieStore = await cookies();
    return verifyToken(cookieStore.get("session")?.value);
}