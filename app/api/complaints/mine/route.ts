import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getComplaintsByUser, serializeComplaint } from "@/lib/complaints";

// ponytail: student feed — own tickets only, polling target (5s client)
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const role = (session.user as typeof session.user & { role?: string }).role;
  if (role !== "student") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const complaints = await getComplaintsByUser(session.user.id);
  return NextResponse.json({ complaints: complaints.map(serializeComplaint) });
}
