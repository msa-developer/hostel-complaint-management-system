"use client";

import { useState } from "react";
import { Icon, I } from "./icons";
import { NAV } from "./data";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--hairline-soft)] bg-[var(--canvas)]/90 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-5" aria-label="Main">
        <a href="#top" className="flex items-center gap-2 text-[19px] font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[var(--ink)] text-white">
            <Icon d={I.ticket} size={16} />
          </span>
          HostelFix
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="text-[14px] text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]">
              {n.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <a href="#cta" className="btn btn-secondary !min-h-[40px] !py-2">Log in</a>
          <a href="#cta" className="btn btn-primary !min-h-[40px] !py-2">Start free trial</a>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-[8px] lg:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>
          <Icon d={menu ? I.close : I.menu} size={20} />
        </button>
      </nav>
      {menu && (
        <div className="border-t border-[var(--hairline-soft)] bg-[var(--canvas)] px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setMenu(false)} className="rounded-[8px] px-3 py-2.5 text-[15px] hover:bg-[var(--surface-2)]">
                {n.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2">
              <a href="#cta" onClick={() => setMenu(false)} className="btn btn-secondary flex-1">Log in</a>
              <a href="#cta" onClick={() => setMenu(false)} className="btn btn-primary flex-1">Start free trial</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
