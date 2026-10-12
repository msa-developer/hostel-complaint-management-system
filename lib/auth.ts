import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { getAuthDb, getMongoClient } from "./mongo";

export type Role = "student" | "warden";

// caveman: base URL from env. localhost fallback for dev only.
const baseURL = process.env.BETTER_AUTH_URL;

export const auth = betterAuth({
  baseURL,
  // ponytail: same origin + deployed URL. empty strings dropped.
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_APP_URL,
    "https://hostelflix.onrender.com",
  ].filter((o): o is string => !!o),
  database: mongodbAdapter(getAuthDb(), { client: getMongoClient() }),
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
