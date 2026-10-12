import { requireRole } from "@/lib/session";
import SignOutButton from "../SignOutButton";

export const instant = false;

export default async function WardenDashboard() {
  const session = await requireRole("warden");

  return (
    <main className="mx-auto max-w-[960px] px-5 py-12">
      <p className="font-mono text-[12px] text-[var(--ink-subtle)]">hostelfix · warden desk</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="display-md">Inbox, {session.user.name}</h1>
        <SignOutButton />
      </div>
      <p className="mt-2 max-w-[60ch] text-[15px] text-[var(--ink-muted)]">
        Every open complaint lands here. Triage, assign, resolve — full queue UI next.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ["Open", "0", "#65b5ff"],
          ["In progress", "0", "#fe4c02"],
          ["Resolved", "0", "#0bdf50"],
        ].map(([label, count, dot]) => (
          <div key={label} className="card-lift p-5">
            <p className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)]">
              <span className="live-dot inline-block h-2 w-2 rounded-full" style={{ background: dot }} />
              {label}
            </p>
            <p className="display-md mt-1">{count}</p>
          </div>
        ))}
      </div>

      <div className="card-lift mt-4 p-6">
        <h2 className="text-[18px] font-medium">Complaint queue</h2>
        <p className="mt-1 font-mono text-[12px] text-[var(--ink-subtle)]">signed in as {session.user.email} · role: warden</p>
        <p className="mt-3 text-[14px] text-[var(--ink-muted)]">Queue empty. New student tickets will appear here for triage.</p>
      </div>
    </main>
  );
}
