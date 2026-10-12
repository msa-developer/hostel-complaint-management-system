import { connection } from "next/server";
import { requireRole } from "@/lib/session";
import { getComplaintsByUser, serializeComplaint } from "@/lib/complaints";
import SignOutButton from "../SignOutButton";
import ComplaintForm from "./ComplaintForm";
import StudentTicketList from "./StudentTicketList";
import StudentStats from "./StudentStats";

// caveman: blocking route. per-user data, no prerender.
export const instant = false;

export default async function StudentDashboard() {
  // caveman: per-user data. wait for request, no static cache.
  await connection();
  const session = await requireRole("student");
  const complaints = await getComplaintsByUser(session.user.id);
  const initial = complaints.map(serializeComplaint);
  const open = complaints.filter((c) => c.status === "open").length;
  const progress = complaints.filter((c) => c.status === "in-progress").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  return (
    <main className="mx-auto max-w-[960px] px-5 py-12">
      <p className="font-mono text-[12px] text-[var(--ink-subtle)]">hostelfix · student desk</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="display-md">Raise a complaint, {session.user.name}</h1>
        <SignOutButton />
      </div>
      <p className="mt-2 max-w-[60ch] text-[15px] text-[var(--ink-muted)]">
        Stuck tap, dead Wi-Fi, cold shower — file it here. Wardens pick it up from the inbox.
      </p>

      <StudentStats open={open} progress={progress} resolved={resolved} />

      <div className="card-lift mt-4 p-6">
        <h2 className="text-[18px] font-medium">New complaint</h2>
        <p className="mt-1 text-[14px] text-[var(--ink-muted)]">
          Category, block, room — wardens see it instantly.
        </p>
        <ComplaintForm />
      </div>

      <div className="card-lift mt-4 p-6">
        <h2 className="text-[18px] font-medium">Your tickets</h2>
        <p className="mt-1 font-mono text-[12px] text-[var(--ink-subtle)]">
          signed in as {session.user.email} · role: student · live, auto-refreshes every 5s
        </p>
        <StudentTicketList initial={initial} />
      </div>
    </main>
  );
}


