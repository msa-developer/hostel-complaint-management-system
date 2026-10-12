"use client";

import { useEffect, useState } from "react";

type Stats = { open: number; progress: number; resolved: number };

// ponytail: counts poll with ticket list — no extra endpoint, derive from /mine payload
export default function StudentStats({
  open,
  progress,
  resolved,
}: {
  open: number;
  progress: number;
  resolved: number;
}) {
  const [s, setS] = useState<Stats>({ open, progress, resolved });

  useEffect(() => {
    let stop = false;
    async function poll() {
      try {
        const res = await fetch("/api/complaints/mine", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (stop || !Array.isArray(data.complaints)) return;
        setS({
          open: data.complaints.filter((c: { status: string }) => c.status === "open").length,
          progress: data.complaints.filter(
            (c: { status: string }) => c.status === "in-progress"
          ).length,
          resolved: data.complaints.filter((c: { status: string }) => c.status === "resolved")
            .length,
        });
      } catch {
        // keep stale counts, retry next tick
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

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {[
        ["Open", String(s.open), "#65b5ff"],
        ["In progress", String(s.progress), "#fe4c02"],
        ["Resolved", String(s.resolved), "#0bdf50"],
      ].map(([label, count, dot]) => (
        <div key={label} className="card-lift p-5">
          <p className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)]">
            <span
              className="live-dot inline-block h-2 w-2 rounded-full"
              style={{ background: dot }}
            />
            {label}
          </p>
          <p className="display-md mt-1">{count}</p>
        </div>
      ))}
    </div>
  );
}