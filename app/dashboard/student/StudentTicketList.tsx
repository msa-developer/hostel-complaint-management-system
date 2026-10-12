"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SerializedComplaint } from "@/lib/complaint-types";

const STATUS_STYLE: Record<string, { dot: string; label: string }> = {
  open: { dot: "#65b5ff", label: "Open" },
  "in-progress": { dot: "#fe4c02", label: "In progress" },
  resolved: { dot: "#0bdf50", label: "Resolved" },
};

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// ponytail: 5s poll = realtime without sockets; pauses when tab hidden
export default function StudentTicketList({
  initial,
}: {
  initial: SerializedComplaint[];
}) {
  const router = useRouter();
  const [tickets, setTickets] = useState(initial);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    let stop = false;
    async function poll() {
      try {
        const res = await fetch("/api/complaints/mine", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!stop && Array.isArray(data.complaints)) setTickets(data.complaints);
      } catch {
        // ponytail: poll failure = keep stale list, next tick retries
      }
    }
    const t = setInterval(() => {
      if (!document.hidden) poll();
    }, 5000);
    return () => {
      stop = true;
      clearInterval(t);
    };
  }, []);

  async function onDelete(id: string) {
    if (!confirm("Delete this ticket? Warden will no longer see it.")) return;
    setDeleting(id);
    try {
      const fd = new FormData();
      fd.set("id", id);
      const { deleteComplaint } = await import("./actions");
      const res = await deleteComplaint({ error: "" }, fd);
      if (res?.error) {
        alert(res.error);
      } else {
        setTickets((prev) => prev.filter((c) => c._id !== id));
        router.refresh();
      }
    } finally {
      setDeleting(null);
    }
  }

  if (tickets.length === 0) {
    return (
      <div className="mt-4 rounded-[8px] border border-dashed border-[var(--hairline)] bg-[var(--canvas)] p-6 text-center">
        <p className="text-[15px] font-medium">No tickets yet</p>
        <p className="mt-1 text-[14px] text-[var(--ink-muted)]">
          File your first complaint above — it will appear here with live status.
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-4 divide-y divide-[var(--hairline-soft)]">
      {tickets.map((c) => {
        const st = STATUS_STYLE[c.status] ?? STATUS_STYLE.open;
        return (
          <li key={c._id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-2">
              <span className="rounded-[4px] bg-[var(--surface-2)] px-1.5 py-0.5 text-[11px] font-medium">
                {c.category}
              </span>
              {c.seenByWarden && (
                <span className="rounded-[4px] px-1.5 py-0.5 text-[11px] font-medium" style={{ background: "rgba(11,223,80,0.12)", color: "#0b7a31" }}>
                  Seen by warden
                </span>
              )}
              <span className="ml-auto text-[11px] text-[var(--ink-tertiary)]">
                {timeAgo(c.createdAt)}
              </span>
            </div>
            <p className="mt-1 text-[14px] font-medium leading-snug">{c.title}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-2 py-0.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: st.dot }} />{" "}
                {st.label}
              </span>
              <span className="text-[var(--ink-subtle)]">
                {c.priority} · {c.block} · {c.room}
              </span>
              <button
                onClick={() => onDelete(c._id)}
                disabled={deleting === c._id}
                className="ml-auto rounded-[6px] border border-[var(--hairline)] px-2 py-1 text-[12px] font-medium text-[#c41c1c] hover:bg-[#c41c1c]/5 disabled:opacity-50"
              >
                {deleting === c._id ? "Deleting…" : "Delete"}
              </button>
            </div>
            {c.description && (
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-muted)]">
                {c.description}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
