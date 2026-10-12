import { TICKETS, CATS } from "./data";

export default function DeskMockup() {
  return (
    <div className="mockup-lift rise rise-4 mx-auto mt-12 max-w-[1060px] overflow-hidden p-3 text-left md:p-4">
      <div className="flex items-center gap-1.5 border-b border-[var(--hairline-soft)] px-3 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 hidden font-mono text-[12px] text-[var(--ink-tertiary)] sm:block">app.hostelfix.in/desk</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[12px] font-medium">
          <span className="live-dot h-2 w-2 rounded-full bg-[#0bdf50]" /> 4 live tickets
        </span>
      </div>
      <div className="grid md:grid-cols-[220px_1fr_260px]">
        <div className="hidden border-r border-[var(--hairline-soft)] p-3 md:block">
          {["All tickets","Unassigned","Urgent first","Overdue","Resolved"].map((f, i) => (
            <div key={f} className={"flex items-center justify-between rounded-[8px] px-3 py-2 text-[13px] " + (i === 0 ? "bg-[var(--ink)] font-medium text-white" : "text-[var(--ink-muted)]")}>
              {f}<span className={"rounded-full px-1.5 text-[11px] " + (i === 0 ? "bg-white/20" : "bg-[var(--surface-2)]")}>{[18,5,3,2,41][i]}</span>
            </div>
          ))}
          <div className="mt-4 border-t border-[var(--hairline-soft)] pt-3">
            <p className="px-3 pb-2 text-[11px] font-medium text-[var(--ink-tertiary)]">CATEGORIES</p>
            {CATS.slice(0, 4).map((c) => (
              <div key={c.name} className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-[var(--ink-muted)]">
                <span className="h-2 w-2 rounded-full" style={{ background: c.color }} /> {c.name}
              </div>
            ))}
          </div>
        </div>
        <div className="md:border-r md:border-[var(--hairline-soft)]">
          {TICKETS.map((t, i) => (
            <div key={t.id} className={"border-b border-[var(--hairline-soft)] px-4 py-3 last:border-0 " + (i === 0 ? "bg-[#fff8f3]" : "")}>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">{t.id}</span>
                <span className="rounded-[4px] bg-[var(--surface-2)] px-1.5 py-0.5 text-[11px] font-medium">{t.tag}</span>
                <span className="ml-auto text-[11px] text-[var(--ink-tertiary)]">{t.time}</span>
              </div>
              <p className="mt-1 text-[14px] font-medium leading-snug">{t.title}</p>
              <div className="mt-2 flex items-center gap-2 text-[12px]">
                <span className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-2 py-0.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.dot }} /> {t.status}
                </span>
                <span className="text-[var(--ink-subtle)]">{t.pri} · {t.room}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden p-4 md:block">
          <p className="font-mono text-[11px] text-[var(--ink-tertiary)]">HX-2041 · Plumbing · B-214</p>
          <p className="mt-1 text-[15px] font-medium leading-snug">No hot water, Block B · 2nd floor</p>
          <div className="mt-3 space-y-2.5 border-l-2 border-[var(--hairline-soft)] pl-3 text-[13px]">
            <div><span className="font-medium">Aarav S.</span> <span className="text-[var(--ink-tertiary)]">· 12m</span><p className="text-[var(--ink-muted)]">Geyser down since morning, 6 rooms hit.</p></div>
            <div><span className="font-medium">Warden Mehta</span> <span className="text-[var(--ink-tertiary)]">· 4m</span><p className="text-[var(--ink-muted)]">Assigned Ramesh. ETA 2 hours.</p></div>
            <div className="rounded-[8px] bg-[var(--surface-2)] p-2.5"><span className="font-medium">Ramesh K.</span> <span className="text-[var(--ink-tertiary)]">· now</span><p className="text-[var(--ink-muted)]">On my way with spare element.</p></div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="btn btn-primary flex-1 !min-h-[36px] !text-[13px]">Resolve</span>
            <span className="btn btn-secondary flex-1 !min-h-[36px] !text-[13px]">Reassign</span>
          </div>
        </div>
      </div>
    </div>
  );
}
