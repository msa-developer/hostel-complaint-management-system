import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  getAllComplaints,
  markComplaintsSeenByWarden,
  serializeComplaint,
} from "@/lib/complaints";

// ponytail: warden inbox — one GET returns queue + marks seen (student sees receipt)
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const role = (session.user as typeof session.user & { role?: string }).role;
  if (role !== "warden") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await markComplaintsSeenByWarden();
  const complaints = await getAllComplaints();
  return NextResponse.json({ complaints: complaints.map(serializeComplaint) });
}
