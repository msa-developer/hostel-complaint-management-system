"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createComplaint } from "./actions";
import { COMPLAINT_CATEGORIES, COMPLAINT_PRIORITIES } from "@/lib/complaint-types";

const input =
  "h-[44px] w-full rounded-[8px] border border-[var(--hairline)] bg-white px-3.5 text-[15px] outline-none placeholder:text-[var(--ink-tertiary)] focus:border-[var(--ink)]";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-accent w-full sm:w-auto">
      {pending ? "Filing…" : "File complaint"}
    </button>
  );
}

export default function ComplaintForm() {
  const [state, formAction] = useActionState(createComplaint, { error: "" } as { error?: string });

  return (
    <form action={formAction} className="mt-4 space-y-3">
      <div>
        <label htmlFor="title" className="mb-1 block text-[13px] font-medium">
          What broke?
        </label>
        <input
          id="title"
          name="title"
          required
          maxLength={140}
          placeholder="e.g. No hot water, Block B · 2nd floor"
          className={input}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-1 block text-[13px] font-medium">
            Category
          </label>
          <select id="category" name="category" required defaultValue="Plumbing" className={input}>
            {COMPLAINT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="mb-1 block text-[13px] font-medium">
            Priority
          </label>
          <select id="priority" name="priority" required defaultValue="Normal" className={input}>
            {COMPLAINT_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="block" className="mb-1 block text-[13px] font-medium">
            Block
          </label>
          <input id="block" name="block" required maxLength={40} placeholder="e.g. Block B" className={input} />
        </div>
        <div>
          <label htmlFor="room" className="mb-1 block text-[13px] font-medium">
            Room
          </label>
          <input id="room" name="room" required maxLength={40} placeholder="e.g. B-214" className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-[13px] font-medium">
          Details <span className="font-normal text-[var(--ink-subtle)]">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          maxLength={2000}
          placeholder="Floor, since when, how many rooms hit…"
          className="w-full rounded-[8px] border border-[var(--hairline)] bg-white px-3.5 py-2.5 text-[15px] outline-none placeholder:text-[var(--ink-tertiary)] focus:border-[var(--ink)]"
        />
      </div>
      {state?.error && (
        <p role="alert" className="rounded-[8px] bg-[#c41c1c]/10 px-3 py-2 text-[13px] text-[#c41c1c]">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
