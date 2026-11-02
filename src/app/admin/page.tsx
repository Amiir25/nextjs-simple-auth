import { getAllSecrets } from "@/lib/dal";
import Link from "next/link";
import { Suspense } from "react";

async function AllSecrest() {
  const secrets = await getAllSecrets();
  return (
    <ul>
      {secrets.map((s) => (
        <li key={s.id}>
          <strong>{s.owner}</strong> {s.text}
        </li>
      ))}
    </ul>
  );
}

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <Link href={"/dashboard"}>Back to dashboard</Link>

      <Suspense>
        <AllSecrest/>
      </Suspense>
    </div>
  );
}
