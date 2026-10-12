import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "./mongo";

export type Role = "student" | "warden";

const { db } = await getDb();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      // input:true so signup can send it; hook below rejects anything but student|warden
      role: { type: "string", required: true, input: true },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = (user as { role?: string }).role;
          if (role !== "student" && role !== "warden") {
            throw new Error("Role must be student or warden");
          }
          return { data: user };
        },
      },
    },
  },
  session: {
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  plugins: [nextCookies()], // last plugin
});

export type Session = typeof auth.$Infer.Session;
