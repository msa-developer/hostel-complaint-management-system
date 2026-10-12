export function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export const I = {
  inbox: "M22 12h-6l-2 3h-4l-2-3H2 M5 5h14l3 7v7H2v-7l3-7z",
  bolt: "M13 2 3 14h7l-1 8 10-12h-7l1-8z",
  ticket: "M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2.5 2.5 0 0 0 0 5v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2.5 2.5 0 0 0 0-5z M13 5v2 M13 11v2 M13 17v2",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0",
  chart: "M3 3v18h18 M7 15l4-6 4 3 4-7",
  check: "M20 6 9 17l-5-5",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  drop: "M12 2.7 17.66 8.36a8 8 0 1 1-11.31 0z",
  bed: "M2 17v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6 M2 17h20 M2 17v2 M22 17v2 M6 9V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2",
  wifi: "M5 12.55a11 11 0 0 1 14.08 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01 M1.42 9a16 16 0 0 1 21.16 0",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  menu: "M4 7h16 M4 12h16 M4 17h16",
  close: "M18 6 6 18 M6 6l12 12",
  plus: "M12 5v14 M5 12h14",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
};
