"use client";
import { useState } from "react";
import { Icon, I } from "./icons";
import { FAQS } from "./data";

export default function Closing() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section id="faq" className="mx-auto max-w-[860px] scroll-mt-20 px-5 py-8 md:py-12">
        <h2 className="display-md text-center">Questions, answered</h2>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="card-lift overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-6 text-left" aria-expanded={open === i}>
                <span className="text-[16px] font-medium">{f.q}</span>
                <span className={"grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] transition-transform " + (open === i ? "rotate-45" : "")}><Icon d={I.plus} size={16} /></span>
              </button>
              {open === i && <p className="px-6 pb-6 text-[15px] text-[var(--ink-muted)]">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>
      <section id="cta" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 py-16 md:py-24">
        <div className="card-lift p-8 text-center md:p-12">
          <h2 className="display-md mx-auto max-w-[18ch]">Fix your first complaint this week</h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-[16px] text-[var(--ink-muted)]">Import blocks, invite wardens, share the student link.</p>
          <form className="mx-auto mt-7 flex max-w-[480px] flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="cta-email" className="sr-only">Work email</label>
            <input id="cta-email" type="email" required placeholder="you@hostel.edu" className="h-[44px] flex-1 rounded-[8px] border border-[var(--hairline)] bg-white px-3.5 text-[15px] outline-none placeholder:text-[var(--ink-tertiary)] focus:border-[var(--ink)]" />
            <button type="submit" className="btn btn-primary">Start free trial</button>
          </form>
          <p className="mt-3 font-mono text-[12px] text-[var(--ink-subtle)]">free-block · no-card · 10-min-setup</p>
        </div>
      </section>
      <footer className="border-t border-[var(--hairline-soft)] px-5 py-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <span className="flex items-center gap-2 text-[18px] font-semibold">
              <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[var(--ink)] text-white"><Icon d={I.ticket} size={16} /></span>HostelFix
            </span>
            <p className="mt-3 max-w-[36ch] text-[13px] text-[var(--ink-subtle)]">The complaint desk for modern hostels.</p>
            <div className="mt-5 flex gap-2">
              <a href="#cta" className="btn btn-secondary !min-h-[40px] !text-[14px]">Log in</a>
              <a href="#cta" className="btn btn-primary !min-h-[40px] !text-[14px]">Start free</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[["Product",["Student app","Warden desk","Analytics","Live demo"]],["Roles",["Students","Wardens","Staff","Admins"]],["Resources",["Help center","Resolution playbook","Community","Status"]],["Company",["About","Careers","Contact","Privacy","Terms"]]].map(([h, links]) => (
              <div key={h as string}><p className="text-[13px] font-medium">{h}</p>
                <ul className="mt-3 space-y-2.5">
                  {(links as string[]).map((l) => (<li key={l}><a href="#top" className="text-[13px] text-[var(--ink-subtle)] hover:text-[var(--ink)]">{l}</a></li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-[1280px] flex-col gap-2 border-t border-[var(--hairline-soft)] pt-6 font-mono text-[12px] text-[var(--ink-tertiary)] sm:flex-row sm:justify-between">
          <span>© 2026 HostelFix</span><span>v0.1.0</span>
        </div>
      </footer>
    </>
  );
}
