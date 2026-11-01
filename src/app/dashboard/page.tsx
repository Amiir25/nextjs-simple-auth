import { getMySecrets } from "@/lib/dal";
import { getSession } from "@/lib/session";
import { Suspense } from "react";

async function UserInfo() {
  const session = await getSession();
  
  return (
    <p>Username: {session ? `${session.username} (${session.role})` : "unknown"}</p>    
  )
}

async function Secret() {
  const secrets = await getMySecrets();
  return (
    <ul>
      {secrets.map((s) => (
        <li key={s.id}>{s.text}</li>
      ))}
    </ul>
  )
}

export default function DashboardPage() {

  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading Session...</p>}>
        <UserInfo/>
        <Secret/>
      </Suspense>
    </div>
  );
}
