"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createComplaintDoc, deleteComplaintByUser } from "@/lib/complaints";

export async function createComplaint(_prev: { error?: string }, formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  const role = (session.user as typeof session.user & { role?: string }).role;
  if (role !== "student") redirect("/dashboard");

  try {
    await createComplaintDoc({
      userId: session.user.id,
      studentName: session.user.name ?? "Student",
      studentEmail: session.user.email ?? "",
      title: String(formData.get("title") ?? ""),
      category: String(formData.get("category") ?? ""),
      block: String(formData.get("block") ?? ""),
      room: String(formData.get("room") ?? ""),
      description: String(formData.get("description") ?? ""),
      priority: String(formData.get("priority") ?? "Normal"),
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not file complaint" };
  }
  revalidatePath("/dashboard/student");
  revalidatePath("/dashboard/warden");
  redirect("/dashboard/student");
}

export async function deleteComplaint(_prev: { error?: string }, formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  const role = (session.user as typeof session.user & { role?: string }).role;
  if (role !== "student") redirect("/dashboard");

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing complaint id" };
  const ok = await deleteComplaintByUser(id, session.user.id);
  if (!ok) return { error: "Could not delete — ticket not found" };
  revalidatePath("/dashboard/student");
  revalidatePath("/dashboard/warden");
  return { error: "" };
}
