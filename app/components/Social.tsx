import { Icon } from "./icons";
import { CATS } from "./data";

export default function Social() {
  const quotes = [
    ["Overdue tickets went from 60 to 4 in six weeks. The SLA timers changed how my staff works.","Ritu Sharma","Warden, NorthGate Hostels"],
    ["Raised a geyser complaint from my room, fixed before dinner. Never visited the office once.","Aditya Verma","Student, Block C"],
    ["One desk for three blocks, five staff, 600 students. Numbers I can show management monthly.","Farhan Qureshi","Admin, CampusNest"],
  ];
  return (
    <>
      <section id="wardens" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 py-16 md:py-24">
        <h2 className="display-md mx-auto max-w-[20ch] text-center">Built for every corner of hostel life</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATS.map((c) => (
            <div key={c.name} className="card-lift p-5 text-center transition-transform hover:-translate-y-1">
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-[8px]" style={{ background: c.color + "1a", color: c.color }}>
                <Icon d={c.icon} size={19} />
              </div>
              <p className="mt-3 text-[14px] font-medium">{c.name}</p>
              <p className="font-mono text-[12px] text-[var(--ink-subtle)]">{c.count} this term</p>
            </div>
          ))}
        </div>
      </section>
      <section id="customers" className="scroll-mt-20 bg-black py-16 text-white md:py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <h2 className="display-md max-w-[20ch]">Wardens clear backlogs. Students stop chasing.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {quotes.map(([q, n, r]) => (
              <figure key={n} className="rounded-[12px] bg-[#1c1c1b] p-8">
                <blockquote className="text-[18px] leading-[1.5]\">&#8220;{q}&#8221;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#313130] text-[14px] font-medium">{(n as string)[0]}</span>
                  <span><span className="block text-[14px] font-medium">{n}</span><span className="block text-[13px] text-[#9c9fa5]">{r}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
