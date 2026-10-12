"use client";
import { useState } from "react";
import { Icon, I } from "./icons";
import { FAQS } from "./data";

export default function Closing() {
  const [open, setOpen] = useState<number | null>(0);
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const plans = [
    { name: "Starter", price: "Rs.0", per: "free forever", d: "One block, 200 students. Kill the paper register.", feats: ["Unlimited complaints","Warden inbox","Status notifications","1 hostel block"], cta: "Start for free", dark: false },
    { name: "Campus", price: billing === "monthly" ? "Rs.1,999" : "Rs.1,599", per: "/month", d: "Multi-block hostels needing SLAs and proof.", feats: ["Everything in Starter","SLA timers + alerts","Staff load + analytics","Unlimited blocks + SMS"], cta: "Start free trial", dark: true },
    { name: "Institution", price: "Custom", per: "", d: "Multi-campus groups with SSO and audits.", feats: ["Everything in Campus","SSO + audit logs","Custom SLAs","Success manager"], cta: "Contact sales", dark: false },
  ];
  return (
    <>
      <section id="pricing" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 py-16 md:py-24">
        <h2 className="display-lg mx-auto max-w-[16ch] text-center">Transparent pricing</h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-center text-[18px] text-[var(--ink-muted)]">Start free with one block. Pay when you scale.</p>
        <div className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-2)]/60 p-1">
          {(["monthly","yearly"] as const).map((b) => (
            <button key={b} onClick={() => setBilling(b)} className={"rounded-full px-5 py-2 text-[14px] font-medium capitalize " + (billing === b ? "bg-white text-[var(--ink)]" : "text-[var(--ink-muted)]")}>{b}{b === "yearly" ? " -20%" : ""}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={"rounded-[12px] p-6 " + (p.dark ? "bg-[var(--ink)] text-white" : "card-lift")}>
              <h3 className="text-[28px] font-medium">{p.name}</h3>
              <p className="mt-3"><span className="text-[32px] font-medium">{p.price}</span>{p.per ? <span className={"text-[14px] " + (p.dark ? "text-[#9c9fa5]" : "text-[var(--ink-muted)]")}> {p.per}</span> : null}</p>
              <p className={"mt-2 text-[14px] " + (p.dark ? "text-[#9c9fa5]" : "text-[var(--ink-muted)]")}>{p.d}</p>
              <ul className="mt-5 space-y-2.5 text-[14px]">
                {p.feats.map((f) => (<li key={f} className="flex items-center gap-2.5"><span className={p.dark ? "text-[#0bdf50]" : "text-[#0a7a2e]"}><Icon d={I.check} size={15} /></span>{f}</li>))}
              </ul>
              <a href="#cta" className={"btn mt-6 w-full " + (p.dark ? "btn-accent" : "btn-primary")}>{p.cta}</a>
            </div>
          ))}
        </div>
      </section>
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
            {[["Product",["Student app","Warden desk","Analytics","Pricing","Live demo"]],["Roles",["Students","Wardens","Staff","Admins"]],["Resources",["Help center","Resolution playbook","Community","Status"]],["Company",["About","Careers","Contact","Privacy","Terms"]]].map(([h, links]) => (
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
