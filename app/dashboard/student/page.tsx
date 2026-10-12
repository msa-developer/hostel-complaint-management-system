import { requireRole } from "@/lib/session";
import { getComplaintsByUser, serializeComplaint } from "@/lib/complaints";
import SignOutButton from "../SignOutButton";
import ComplaintForm from "./ComplaintForm";
import StudentTicketList from "./StudentTicketList";

export const instant = false;

export default async function StudentDashboard() {
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

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ["Open", String(open), "#65b5ff"],
          ["In progress", String(progress), "#fe4c02"],
          ["Resolved", String(resolved), "#0bdf50"],
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


