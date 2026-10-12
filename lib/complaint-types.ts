export const COMPLAINT_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Internet",
  "Room & Beds",
  "Mess & Food",
  "Maintenance",
] as const;

export const COMPLAINT_PRIORITIES = ["Normal", "High", "Urgent"] as const;

export const COMPLAINT_STATUSES = ["open", "in-progress", "resolved"] as const;

export type ComplaintCategory = (typeof COMPLAINT_CATEGORIES)[number];
export type ComplaintPriority = (typeof COMPLAINT_PRIORITIES)[number];
export type ComplaintStatus = (typeof COMPLAINT_STATUSES)[number];

export type Complaint = {
  _id: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  title: string;
  category: ComplaintCategory;
  block: string;
  room: string;
  description: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  seenByWarden: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// ponytail: wire shape for API + RSC-to-client props (Dates as ISO strings)
export type SerializedComplaint = Omit<Complaint, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
