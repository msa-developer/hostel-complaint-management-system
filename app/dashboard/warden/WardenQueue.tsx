"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SerializedComplaint } from "@/lib/complaint-types";
import { COMPLAINT_STATUSES } from "@/lib/complaint-types";

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

// ponytail: 5s poll = realtime inbox without sockets; pauses when tab hidden
export default function WardenQueue({ initial }: { initial: SerializedComplaint[] }) {
  const router = useRouter();
  const [queue, setQueue] = useState(initial);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    let stop = false;
    async function poll() {
      try {
        const res = await fetch("/api/complaints/all", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!stop && Array.isArray(data.complaints)) setQueue(data.complaints);
      } catch {
        // ponytail: poll failure = keep stale queue, next tick retries
      }
    }
    poll();
    const t = setInterval(() => {
      if (!document.hidden) poll();
    }, 5000);
    return () => {
      stop = true;
      clearInterval(t);
    };
  }, []);

  async function setStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Update failed");
        return;
      }
      const data = await res.json();
      setQueue((prev) => prev.map((c) => (c._id === id ? data.complaint : c)));
      router.refresh();
    } finally {
      setUpdating(null);
    }
  }

  if (queue.length === 0) {
    return (
      <p className="mt-3 text-[14px] text-[var(--ink-muted)]">
        Queue empty. New student tickets will appear here for triage.
      </p>
    );
  }

  return (
    <ul className="mt-4 divide-y divide-[var(--hairline-soft)]">
      {queue.map((c) => {
        const st = STATUS_STYLE[c.status] ?? STATUS_STYLE.open;
        return (
          <li key={c._id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-[4px] bg-[var(--surface-2)] px-1.5 py-0.5 text-[11px] font-medium">
                {c.category}
              </span>
              <span
                className="rounded-[4px] px-1.5 py-0.5 text-[11px] font-medium"
                style={
                  c.seenByWarden
                    ? { background: "rgba(11,223,80,0.12)", color: "#0b7a31" }
                    : { background: "rgba(254,76,2,0.10)", color: "#fe4c02" }
                }
              >
                {c.seenByWarden ? "Seen" : "New"}
              </span>
              <span className="ml-auto text-[11px] text-[var(--ink-tertiary)]">
                {timeAgo(c.createdAt)}
              </span>
            </div>
            <p className="mt-1 text-[15px] font-medium leading-snug">{c.title}</p>
            <p className="mt-0.5 font-mono text-[12px] text-[var(--ink-subtle)]">
              {c.studentName} · {c.studentEmail} · {c.block} · {c.room} · {c.priority}
            </p>
            {c.description && (
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-muted)]">
                {c.description}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-2 py-0.5 text-[12px] font-medium">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: st.dot }} />{" "}
                {st.label}
              </span>
              <select
                value={c.status}
                disabled={updating === c._id}
                onChange={(e) => setStatus(c._id, e.target.value)}
                aria-label={`Status for ${c.title}`}
                className="h-[36px] rounded-[8px] border border-[var(--hairline)] bg-white px-2 text-[13px] outline-none focus:border-[var(--ink)] disabled:opacity-50"
              >
                {COMPLAINT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_STYLE[s]?.label ?? s}
                  </option>
                ))}
              </select>
              {updating === c._id && (
                <span className="text-[12px] text-[var(--ink-subtle)]">Saving…</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
