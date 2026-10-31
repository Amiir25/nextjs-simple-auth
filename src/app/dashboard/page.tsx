import { getSession } from "@/lib/session";
import { Suspense } from "react";

export async function UserInfo() {
  const session = await getSession();
  
  return (
    <p>Username: {session ? `${session.username} (${session.role})` : "unknown"}</p>    
  )
}

export default function DashboardPage() {

  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading Session...</p>}>
        <UserInfo/>
      </Suspense>
    </div>
  );
}
