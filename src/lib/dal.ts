import "server-only";
import { cache } from "react";
import { getSession } from "./session";
import { redirect } from "next/navigation";

// Verify the session. Redirect if there isn't one
// Cache() means this runs once per request, even if called many times
export const requireSession = cache(async () => {
    const session = await getSession();
    if (!session) redirect("/login");
    return session;
});

// Fake "databse" of secrets, keyes by owner
const secrets = [
    { id: 1, owner: "alice", text: "Alice's secret: the cake is a lie." },
    { id: 2, owner: "admin", text: "Admin's secret: the root password is hunter2." },
];

// Only returns the secrets belonging to the logged-in user
export async function getMySecrets() {
    const session = await requireSession();
    return secrets.filter((s) => s.owner === session.username);
}


// Protect a Server Action too
export async function addSecret(text: string) {
    const session = await requireSession();     // check first, always
    secrets.push({ id: secrets.length = 1, owner: session.username, text });
}
