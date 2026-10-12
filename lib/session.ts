import { auth, type Role } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  return session;
}

export async function requireRole(role: Role | Role[]) {
  const session = await requireSession();
  const roles = Array.isArray(role) ? role : [role];
  const userRole = (session.user as typeof session.user & { role: string }).role;
  if (!roles.includes(userRole as Role)) redirect("/dashboard");
  return session;
}

export function dashboardPathFor(role: string | undefined): string {
  return role === "warden" ? "/dashboard/warden" : "/dashboard/student";
}
