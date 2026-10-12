import { ObjectId } from "mongodb";
import { getDb } from "./mongo";
import {
  COMPLAINT_CATEGORIES,
  COMPLAINT_PRIORITIES,
  COMPLAINT_STATUSES,
  type Complaint,
  type SerializedComplaint,
  type ComplaintCategory,
  type ComplaintPriority,
  type ComplaintStatus,
} from "./complaint-types";

type ComplaintDoc = {
  _id: ObjectId;
  userId: string;
  studentName: string;
  studentEmail: string;
  title: string;
  category: string;
  block: string;
  room: string;
  description: string;
  priority: string;
  status: string;
  seenByWarden: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function toComplaint(doc: ComplaintDoc): Complaint {
  return {
    _id: doc._id.toString(),
    userId: doc.userId,
    studentName: doc.studentName ?? "",
    studentEmail: doc.studentEmail ?? "",
    title: doc.title,
    category: doc.category as ComplaintCategory,
    block: doc.block,
    room: doc.room,
    description: doc.description,
    priority: doc.priority as ComplaintPriority,
    status: doc.status as ComplaintStatus,
    seenByWarden: doc.seenByWarden === true,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function serializeComplaint(c: Complaint): SerializedComplaint {
  return {
    ...c,
    createdAt: new Date(c.createdAt).toISOString(),
    updatedAt: new Date(c.updatedAt).toISOString(),
  };
}

// ponytail: single collection, index on userId+createdAt created lazily on first read
export async function getComplaintsByUser(userId: string): Promise<Complaint[]> {
  const { db } = await getDb();
  const col = db.collection<ComplaintDoc>("complaints");
  await col.createIndex({ userId: 1, createdAt: -1 });
  const docs = await col.find({ userId }).sort({ createdAt: -1 }).limit(100).toArray();
  return docs.map(toComplaint);
}

// ponytail: warden inbox = one query, newest first; extra indexes created lazily
export async function getAllComplaints(): Promise<Complaint[]> {
  const { db } = await getDb();
  const col = db.collection<ComplaintDoc>("complaints");
  await col.createIndex({ createdAt: -1 });
  await col.createIndex({ status: 1, createdAt: -1 });
  const docs = await col.find({}).sort({ createdAt: -1 }).limit(200).toArray();
  return docs.map(toComplaint);
}

export async function markComplaintsSeenByWarden(): Promise<number> {
  const { db } = await getDb();
  const col = db.collection<ComplaintDoc>("complaints");
  // caveman: warden open inbox = receipt. unseen open -> seen in-progress. one op.
  const res = await col.updateMany(
    { seenByWarden: { $ne: true }, status: "open" },
    { $set: { seenByWarden: true, status: "in-progress", updatedAt: new Date() } }
  );
  const rest = await col.updateMany(
    { seenByWarden: { $ne: true } },
    { $set: { seenByWarden: true, updatedAt: new Date() } }
  );
  // ponytail: rest covers non-open unseen (in-progress/resolved). sum both passes.
  return res.modifiedCount + rest.modifiedCount;
}

export async function markComplaintSeenByWarden(id: string): Promise<Complaint | null> {
  if (!ObjectId.isValid(id)) return null;
  const { db } = await getDb();
  const col = db.collection<ComplaintDoc>("complaints");
  // caveman: single ticket seen. open -> in-progress only. no touch otherwise.
  const res = await col.findOneAndUpdate(
    { _id: new ObjectId(id), status: "open" },
    { $set: { seenByWarden: true, status: "in-progress", updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  if (res) return toComplaint(res);
  // ponytail: already triaged. mark seen only, keep status.
  const seen = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { seenByWarden: true, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  return seen ? toComplaint(seen) : null;
}

// ponytail: student self-delete only — caller enforces userId match
export async function deleteComplaintByUser(id: string, userId: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const { db } = await getDb();
  const col = db.collection<ComplaintDoc>("complaints");
  const res = await col.deleteOne({ _id: new ObjectId(id), userId });
  return res.deletedCount === 1;
}

export async function updateComplaintStatus(
  id: string,
  status: string
): Promise<Complaint | null> {
  if (!ObjectId.isValid(id)) return null;
  if (!(COMPLAINT_STATUSES as readonly string[]).includes(status)) {
    throw new Error("Invalid status");
  }
  const { db } = await getDb();
  const col = db.collection<ComplaintDoc>("complaints");
  const res = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        seenByWarden: true,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );
  return res ? toComplaint(res) : null;
}

export async function createComplaintDoc(input: {
  userId: string;
  studentName: string;
  studentEmail: string;
  title: string;
  category: string;
  block: string;
  room: string;
  description: string;
  priority: string;
}): Promise<Complaint> {
  const title = input.title.trim();
  const block = input.block.trim();
  const room = input.room.trim();
  const description = input.description.trim();
  if (!title || title.length > 140) throw new Error("Title must be 1-140 characters");
  if (!block || block.length > 40) throw new Error("Block is required");
  if (!room || room.length > 40) throw new Error("Room is required");
  if (description.length > 2000) throw new Error("Description too long");
  if (!(COMPLAINT_CATEGORIES as readonly string[]).includes(input.category)) {
    throw new Error("Invalid category");
  }
  if (!(COMPLAINT_PRIORITIES as readonly string[]).includes(input.priority)) {
    throw new Error("Invalid priority");
  }
  const now = new Date();
  const { db } = await getDb();
  const col = db.collection<Omit<ComplaintDoc, "_id">>("complaints");
  const res = await col.insertOne({
    userId: input.userId,
    studentName: input.studentName,
    studentEmail: input.studentEmail,
    title,
    category: input.category,
    block,
    room,
    description,
    priority: input.priority,
    status: "open",
    seenByWarden: false,
    createdAt: now,
    updatedAt: now,
  });
  return {
    _id: res.insertedId.toString(),
    userId: input.userId,
    studentName: input.studentName,
    studentEmail: input.studentEmail,
    title,
    category: input.category as ComplaintCategory,
    block,
    room,
    description,
    priority: input.priority as ComplaintPriority,
    status: "open",
    seenByWarden: false,
    createdAt: now,
    updatedAt: now,
  };
}
