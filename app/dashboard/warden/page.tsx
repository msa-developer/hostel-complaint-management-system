import { connection } from "next/server";
import { requireRole } from "@/lib/session";
import { getAllComplaints, markComplaintsSeenByWarden, serializeComplaint } from "@/lib/complaints";
import SignOutButton from "../SignOutButton";
import WardenQueue from "./WardenQueue";
import WardenStats from "./WardenStats";

// caveman: blocking route. inbox data, no prerender.
export const instant = false;

export default async function WardenDashboard() {
  // caveman: inbox data. wait for request, no static cache.
  await connection();
  const session = await requireRole("warden");

  // ponytail: opening inbox = seeing it — mark seen, then load queue
  await markComplaintsSeenByWarden();
  const complaints = await getAllComplaints();
  const initial = complaints.map(serializeComplaint);
  const open = complaints.filter((c) => c.status === "open").length;
  const progress = complaints.filter((c) => c.status === "in-progress").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  return (
    <main className="mx-auto max-w-[960px] px-5 py-12">
      <p className="font-mono text-[12px] text-[var(--ink-subtle)]">hostelfix · warden desk</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="display-md">Inbox, {session.user.name}</h1>
        <SignOutButton />
      </div>
      <p className="mt-2 max-w-[60ch] text-[15px] text-[var(--ink-muted)]">
        Every open complaint lands here. Triage, assign, resolve — live, auto-refreshes every 5s.
      </p>

      <WardenStats open={open} progress={progress} resolved={resolved} />

      <div className="card-lift mt-4 p-6">
        <h2 className="text-[18px] font-medium">Complaint queue</h2>
        <p className="mt-1 font-mono text-[12px] text-[var(--ink-subtle)]">
          signed in as {session.user.email} · role: warden · {complaints.length} ticket
          {complaints.length === 1 ? "" : "s"}
        </p>
        <WardenQueue initial={initial} />
      </div>
    </main>
  );
}

