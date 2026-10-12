"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { markComplaintSeenByWarden, updateComplaintStatus } from "@/lib/complaints";

async function requireWarden() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  const role = (session.user as typeof session.user & { role?: string }).role;
  if (role !== "warden") redirect("/dashboard");
}

export async function setComplaintStatus(formData: FormData) {
  await requireWarden();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !status) return;
  await updateComplaintStatus(id, status);
  revalidatePath("/dashboard/warden");
  revalidatePath("/dashboard/student");
}

export async function markSeen(formData: FormData) {
  await requireWarden();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await markComplaintSeenByWarden(id);
  revalidatePath("/dashboard/warden");
  revalidatePath("/dashboard/student");
}
