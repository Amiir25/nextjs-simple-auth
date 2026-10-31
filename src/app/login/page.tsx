"use client";

import React, { useActionState } from "react";
import login from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form
      action={formAction}
      style={{ padding: 24, display: "grid", gap: 8, maxWidth: 260 }}
    >
      <h1>Login</h1>

      <input name="username" placeholder="username" required />
      <input name="password" type="password" placeholder="password" required />
      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      
      <button disabled={pending}>{pending ? "Logging in..." : "Log in"}</button>
    </form>
  );
}
