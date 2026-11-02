import { getMySecrets, requireSession } from "@/lib/dal";
import Link from "next/link";
import { Suspense } from "react";
import { logout } from "../login/actions";

async function UserInfo() {
  const session = await requireSession();
  return (
    <div>
      <p>
        Username:{" "}
        {session ? `${session.username} (${session.role})` : "unknown"}
      </p>
      {session.role === "admin" && (
        <Link href={"/admin"}>Go to admin panel</Link>
      )}
    </div>
  );
}

async function Secret() {
  const secrets = await getMySecrets();
  return (
    <ul>
      {secrets.map((s) => (
        <li key={s.id}>{s.text}</li>
      ))}
    </ul>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading Session...</p>}>
        <UserInfo />
        <Secret />
      </Suspense>

      <form action={logout}>
        <button>Log out</button>
      </form>
    </div>
  );
}
