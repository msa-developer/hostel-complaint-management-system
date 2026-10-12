import { Icon } from "./icons";
import { FEATURES } from "./data";

export default function How() {
  const bars = [35,55,42,70,58,82,64,90,74,95,68,88];
  const cols = ["#65b5ff","#0bdf50","#ff2067","#b3e01c","#03b2cb","#fe4c02"];
  const stats = [["Avg resolution","6.2 hours","-38%"],["Resolved on SLA","94%","+6 pts"],["Reopened","3.1%","-2 pts"]];
  return (
    <section id="how" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 py-8 md:py-12">
      <h2 className="display-lg mx-auto max-w-[18ch] text-center">Everything a complaint desk needs</h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.t} className="card-lift p-6">
            <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-[var(--surface-2)]"><Icon d={f.icon} size={19} /></div>
            <h3 className="mt-4 text-[17px] font-medium">{f.t}</h3>
            <p className="mt-1.5 text-[14px] text-[var(--ink-muted)]">{f.d}</p>
          </div>
        ))}
      </div>
      <div className="mockup-lift mt-5 grid overflow-hidden lg:grid-cols-[1fr_320px]">
        <div className="p-6 md:p-8">
          <h3 className="text-[22px] font-medium">Resolution analytics management will read</h3>
          <p className="mt-2 max-w-[52ch] text-[15px] text-[var(--ink-muted)]">Fix time down 38% across pilot hostels. Spot repeat blocks, overloaded staff, SLA breaches.</p>
          <div className="mt-6 flex h-40 items-end gap-2" aria-hidden>
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-[6px]" style={{ height: h + "%", background: cols[i % 6], opacity: i > 8 ? 1 : 0.55 }} />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[11px] text-[var(--ink-tertiary)]"><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span></div>
        </div>
        <div className="border-t border-[var(--hairline-soft)] bg-[var(--canvas)] p-6 md:p-8 lg:border-l lg:border-t-0">
          <p className="text-[13px] font-medium text-[var(--ink-subtle)]">THIS MONTH</p>
          <div className="mt-4 space-y-4">
            {stats.map(([l, v, d]) => (
              <div key={l} className="flex items-baseline justify-between border-b border-[var(--hairline-soft)] pb-3 last:border-0">
                <div><p className="text-[13px] text-[var(--ink-muted)]">{l}</p><p className="text-[22px] font-medium">{v}</p></div>
                <span className="rounded-full bg-[#e6f9ec] px-2 py-0.5 font-mono text-[12px] text-[#0a7a2e]">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
