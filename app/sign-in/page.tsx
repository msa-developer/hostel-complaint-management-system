"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });
    setLoading(false);
    if (error) {
      setError(error.message ?? "Sign in failed");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  const input =
    "h-[44px] w-full rounded-[8px] border border-[var(--hairline)] bg-white px-3.5 text-[15px] outline-none placeholder:text-[var(--ink-tertiary)] focus:border-[var(--ink)]";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col justify-center px-5 py-16">
      <p className="font-mono text-[12px] text-[var(--ink-subtle)]">hostelfix · log-in</p>
      <h1 className="display-md mt-2">Welcome back</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-muted)]">Log in to reach your desk.</p>

      <form onSubmit={onSubmit} className="card-lift mt-6 space-y-3 p-6">
        <div>
          <label htmlFor="email" className="mb-1 block text-[13px] font-medium">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hostel.edu" className={input} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-[13px] font-medium">Password</label>
          <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={input} />
        </div>
        {error && <p role="alert" className="rounded-[8px] bg-[#c41c1c]/10 px-3 py-2 text-[13px] text-[#c41c1c]">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-4 text-center text-[14px] text-[var(--ink-muted)]">
        No account? <Link href="/sign-up" className="font-medium text-[var(--ink)] underline">Sign up</Link>
      </p>
    </main>
  );
}
