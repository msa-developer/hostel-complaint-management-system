import { Icon, I } from "./icons";


export default function Product() {
  return (
    <section id="product" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 py-16 md:py-24">
      <h2 className="display-lg mx-auto max-w-[18ch] text-center">Two sides, one seamless resolution flow</h2>
      <p className="mx-auto mt-4 max-w-[56ch] text-center text-[18px] text-[var(--ink-muted)]">Students get a 30-second complaint box. Wardens get a real desk.</p>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="card-lift p-6 md:p-8">
          <div className="grid h-11 w-11 place-items-center rounded-[12px] bg-[var(--ink)] text-white"><Icon d={I.bolt} size={20} /></div>
          <h3 className="mt-5 text-[22px] font-medium">Student app</h3>
          <p className="mt-2 text-[16px] text-[var(--ink-muted)]">Raise a complaint with category, room, photo. Track live, confirm fix or reopen in one tap.</p>
          <div className="mt-6 rounded-[12px] border border-[var(--hairline-soft)] bg-[var(--canvas)] p-4">
            <div className="flex justify-between text-[13px]"><span className="font-medium">New complaint</span><span className="font-mono text-[11px] text-[var(--ink-tertiary)]">30 sec</span></div>
            <div className="mt-3 space-y-2">
              <div className="rounded-[8px] bg-white px-3 py-2.5 text-[13px]">Leaking tap, washroom 2 — Block A</div>
              <div className="rounded-[8px] bg-white px-3 py-2.5 text-[13px]">Electrical · A-102 · photo attached</div>
              <div className="rounded-[8px] bg-[var(--ink)] px-3 py-2.5 text-center text-[13px] font-medium text-white">Submit complaint</div>
            </div>
          </div>
        </div>
        <div className="card-lift p-6 md:p-8">
          <div className="grid h-11 w-11 place-items-center rounded-[12px] bg-[var(--accent)] text-white"><Icon d={I.inbox} size={20} /></div>
          <h3 className="mt-5 text-[22px] font-medium">Warden desk</h3>
          <p className="mt-2 text-[16px] text-[var(--ink-muted)]">One inbox with triage, assignment, SLA timers — clear the backlog faster.</p>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-[8px] border border-[var(--hairline-soft)] bg-[var(--canvas)] px-2 py-3"><p className="text-[20px] font-medium">18</p><p className="text-[12px] text-[var(--ink-subtle)]">Open</p></div>
            <div className="rounded-[8px] border border-[var(--hairline-soft)] bg-[var(--canvas)] px-2 py-3"><p className="text-[20px] font-medium">6.2h</p><p className="text-[12px] text-[var(--ink-subtle)]">Avg fix</p></div>
            <div className="rounded-[8px] border border-[var(--hairline-soft)] bg-[var(--canvas)] px-2 py-3"><p className="text-[20px] font-medium">94%</p><p className="text-[12px] text-[var(--ink-subtle)]">Resolved</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
