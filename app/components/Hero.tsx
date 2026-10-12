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
      <DeskMockup />
    </section>
  );
}
