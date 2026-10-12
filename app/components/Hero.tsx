import { Icon, I } from "./icons";
import DeskMockup from "./DeskMockup";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pt-16 pb-10 text-center md:pt-24">
      <h1 className="display-xl rise rise-1 mx-auto max-w-[16ch]">
        A complete system for hostel complaints that actually get fixed
      </h1>
      <p className="rise rise-2 mx-auto mt-6 max-w-[58ch] text-[18px] leading-[1.5] text-[var(--ink-muted)]">
        HostelFix is the only complaint desk with a natively integrated resolution
        flow — students raise tickets in seconds, wardens triage from one inbox,
        and every conversation moves the fix forward.
      </p>
      <div className="rise rise-3 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="#cta" className="btn btn-primary w-full sm:w-auto">Start free trial <Icon d={I.arrow} size={16} /></a>
        <a href="#product" className="btn btn-secondary w-full sm:w-auto">View live demo</a>
      </div>
      <p className="rise rise-4 mt-4 text-[13px] text-[var(--ink-subtle)]">Free for one hostel block · No credit card required · Set up in 10 minutes</p>
      <DeskMockup />
      <p className="mt-10 text-[13px] font-medium text-[var(--ink-subtle)]">Trusted by 300+ hostels, PGs, and campus residences</p>
      <div className="mt-5 grid grid-cols-3 items-center gap-3 md:grid-cols-6">
        {["NorthGate Hostels","CampusNest","UrbanStay PG","Scholars Inn","GreenView Dorms","LakeSide Living"].map((l) => (
          <div key={l} className="rounded-[4px] px-4 py-4 text-center text-[13px] font-medium text-[var(--ink-muted)]">{l}</div>
        ))}
      </div>
    </section>
  );
}
