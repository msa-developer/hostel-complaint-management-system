import { requireRole } from "@/lib/session";
import { getComplaintsByUser } from "@/lib/complaints";
import SignOutButton from "../SignOutButton";
import ComplaintForm from "./ComplaintForm";

export const instant = false;

const STATUS_STYLE: Record<string, { dot: string; label: string }> = {
  open: { dot: "#65b5ff", label: "Open" },
  "in-progress": { dot: "#fe4c02", label: "In progress" },
  resolved: { dot: "#0bdf50", label: "Resolved" },
};

function timeAgo(d: Date): string {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default async function StudentDashboard() {
  const session = await requireRole("student");
  const complaints = await getComplaintsByUser(session.user.id);
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
          signed in as {session.user.email} · role: student
        </p>
        {complaints.length === 0 ? (
          <div className="mt-4 rounded-[8px] border border-dashed border-[var(--hairline)] bg-[var(--canvas)] p-6 text-center">
            <p className="text-[15px] font-medium">No tickets yet</p>
            <p className="mt-1 text-[14px] text-[var(--ink-muted)]">
              File your first complaint above — it will appear here with live status.
            </p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-[var(--hairline-soft)]">
            {complaints.map((c) => {
              const st = STATUS_STYLE[c.status] ?? STATUS_STYLE.open;
              return (
                <li key={c._id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-[4px] bg-[var(--surface-2)] px-1.5 py-0.5 text-[11px] font-medium">
                      {c.category}
                    </span>
                    <span className="ml-auto text-[11px] text-[var(--ink-tertiary)]">{timeAgo(c.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-[14px] font-medium leading-snug">{c.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
                    <span className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-2 py-0.5 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: st.dot }} /> {st.label}
                    </span>
                    <span className="text-[var(--ink-subtle)]">
                      {c.priority} · {c.block} · {c.room}
                    </span>
                  </div>
                  {c.description && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-muted)]">{c.description}</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}

