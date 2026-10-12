import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { updateComplaintStatus, serializeComplaint } from "@/lib/complaints";

// ponytail: warden triage — status only (student/warden revalidate via polling)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const role = (session.user as typeof session.user & { role?: string }).role;
  if (role !== "warden") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  let status = "";
  try {
    const body = await req.json();
    status = String(body?.status ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const updated = await updateComplaintStatus(id, status);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ complaint: serializeComplaint(updated) });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Update failed" },
      { status: 400 }
    );
  }
}
