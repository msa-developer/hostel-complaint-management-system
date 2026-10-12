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
        </div>
        <button className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[8px] lg:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu} aria-controls="mobile-menu">
          <span className={`col-start-1 row-start-1 grid place-items-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${menu ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
            <Icon d={I.menu} size={20} />
          </span>
          <span className={`col-start-1 row-start-1 grid place-items-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${menu ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`}>
            <Icon d={I.close} size={20} />
          </span>
        </button>
      </nav>
      <div id="mobile-menu" aria-hidden={!menu} inert={!menu} className={`absolute inset-x-0 top-full origin-top border-t border-[var(--hairline-soft)] bg-[var(--canvas)] px-5 py-4 shadow-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${menu ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"}`}>
        <div className="flex flex-col gap-1">
          {NAV.map((n, i) => (
            <a key={n.label} href={n.href} onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1} style={{ transitionDelay: menu ? `${60 + i * 40}ms` : "0ms" }} className={`rounded-[8px] px-3 py-2.5 text-[15px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--surface-2)] ${menu ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
              {n.label}
            </a>
          ))}
            <div className="mt-3 flex gap-2">
              <a href="#cta" onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1} className="btn btn-secondary flex-1">Log in</a>
            </div>
          </div>
        </div>
    </header>
  );
}
