import { redirect } from "next/navigation";
import { requireSession, dashboardPathFor } from "@/lib/session";

export const instant = false;

export default async function DashboardIndex() {
  const session = await requireSession();
  const role = (session.user as typeof session.user & { role?: string }).role;
  redirect(dashboardPathFor(role));
}
