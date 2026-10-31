"use server";

import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function login(prevState: { error?: string } | undefined, formData: FormData) {
    // Fake "database"
    const users = [
        { username: "alice", password: "user1234", role: "user" as const },
        { username: "admin", password: "admin1234", role: "admin" as const },
    ];

    const username = formData.get("username")
    const password = formData.get("password");

    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return { error: "Invalid email or password!" };  // becomes the next prevState and the new `state`
    }

    await createSession({ username: user.username, role: user.role });
    redirect("/dashboard");
}