import { I } from "./icons";

export const NAV = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "For wardens", href: "#wardens" },
  { label: "Customers", href: "#customers" },
  { label: "FAQ", href: "#faq" },
];

export const TICKETS = [
  { id: "HX-2041", title: "No hot water, Block B · 2nd floor", tag: "Plumbing", pri: "Urgent", status: "In progress", dot: "#fe4c02", time: "12 min ago", room: "B-214" },
  { id: "HX-2040", title: "Wi-Fi drops every evening in study hall", tag: "Internet", pri: "High", status: "Open", dot: "#65b5ff", time: "48 min ago", room: "Study Hall" },
  { id: "HX-2039", title: "Tube light flickering, corridor C", tag: "Electrical", pri: "Normal", status: "Open", dot: "#0bdf50", time: "2 h ago", room: "C-Corridor" },
  { id: "HX-2038", title: "Mess food complaint — dinner quality", tag: "Mess", pri: "Normal", status: "Resolved", dot: "#9c9fa5", time: "Yesterday", room: "Mess Hall" },
];

export const CATS = [
  { icon: I.drop, name: "Plumbing", count: 128, color: "#03b2cb" },
  { icon: I.bolt, name: "Electrical", count: 214, color: "#fe4c02" },
  { icon: I.wifi, name: "Internet", count: 96, color: "#65b5ff" },
  { icon: I.bed, name: "Room & Beds", count: 87, color: "#ff2067" },
  { icon: I.users, name: "Mess & Food", count: 143, color: "#0bdf50" },
  { icon: I.wrench, name: "Maintenance", count: 172, color: "#b3e01c" },
];

export const FEATURES = [
  { icon: I.inbox, t: "Priority inbox", d: "Urgent midnight plumbing outranks a flickering corridor light. Auto-sorting by category, block, and SLA keeps the queue honest." },
  { icon: I.ticket, t: "Tickets that collaborate", d: "One ticket for the issue, linked staff tasks underneath. Comments, photos, and reassignment stay on one thread." },
  { icon: I.bell, t: "Updates before they ask", d: "Students get notified at every move — assigned, in progress, resolved. Nobody has to chase the office." },
  { icon: I.chart, t: "Resolution analytics", d: "Average fix time per category, overdue heatmaps, staff load. Managers see what to fix first." },
  { icon: I.shield, t: "Role-based access", d: "Students, wardens, staff, admins — each role sees exactly its scope, backed by database constraints." },
  { icon: I.clock, t: "SLA timers", d: "Plumbing 24h, electrical 12h, internet 8h. Breach warnings nudge wardens before students escalate." },
];

export const FAQS = [
  { q: "What do we need to implement first?", a: "Authentication. Three roles — student, warden/staff, admin — with hostel-block scoping. Students see only their own tickets, wardens see assigned blocks, admins see everything. Email plus password with hashed storage in MongoDB, session cookies, protected routes." },
  { q: "How does a complaint move from raised to resolved?", a: "Student raises a ticket with category, block, room, and photo. It lands in the warden inbox as Open. A warden assigns staff, sets priority, moves it to In progress. The student gets live status updates. Staff marks Resolved, the student confirms or reopens. Every step is timestamped." },
  { q: "What does the MongoDB backend look like?", a: "Four collections: users (role, hostel, block, room), complaints (title, category, priority, status, assignee, photos, timeline), comments, and notifications. Statuses stay constrained to open, in-progress, resolved, reopened, closed. Indexes on hostel plus status plus createdAt keep the inbox fast." },
  { q: "Can wardens manage workload across staff?", a: "Yes. The desk shows open load per staff member, average resolution time per category, and overdue tickets. Reassign in one click, set SLAs per category, get nudged on breach." },
  { q: "Is there a cost to try HostelFix?", a: "One hostel block is free forever, up to 200 students. Paid plans add analytics, SLA automation, SMS updates, and multi-hostel management. No credit card required." },
];
