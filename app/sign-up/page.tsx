"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import type { Role } from "@/lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
      callbackURL: "/dashboard",
    });
    setLoading(false);
    if (error) {
      // impeccable: show real server message, not generic fallback.
      setError(error.message || (error as { code?: string }).code || "Sign up failed");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  const input =
    "h-[44px] w-full rounded-[8px] border border-[var(--hairline)] bg-white px-3.5 text-[15px] outline-none placeholder:text-[var(--ink-tertiary)] focus:border-[var(--ink)]";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col justify-center px-5 py-16">
      <p className="font-mono text-[12px] text-[var(--ink-subtle)]">hostelfix · sign-up</p>
      <h1 className="display-md mt-2">Create your account</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-muted)]">
        Students raise complaints. Wardens resolve them.
      </p>

      <div className="card-lift mt-6 grid grid-cols-2 gap-2 p-2" role="tablist" aria-label="Pick a role">
        {(["student", "warden"] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            role="tab"
            aria-selected={role === r}
            onClick={() => setRole(r)}
            className={`btn ${role === r ? "btn-primary" : "btn-secondary"}`}
          >
            {r === "student" ? "Student" : "Warden"}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="card-lift mt-4 space-y-3 p-6">
        <div>
          <label htmlFor="name" className="mb-1 block text-[13px] font-medium">Full name</label>
          <input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Aarav Sharma" className={input} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-[13px] font-medium">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hostel.edu" className={input} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-[13px] font-medium">Password</label>
          <input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" className={input} />
        </div>
        {error && <p role="alert" className="rounded-[8px] bg-[#c41c1c]/10 px-3 py-2 text-[13px] text-[#c41c1c]">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-accent w-full">
          {loading ? "Creating…" : `Sign up as ${role}`}
        </button>
      </form>

      <p className="mt-4 text-center text-[14px] text-[var(--ink-muted)]">
        Have an account? <Link href="/sign-in" className="font-medium text-[var(--ink)] underline">Log in</Link>
      </p>
    </main>
  );
}
