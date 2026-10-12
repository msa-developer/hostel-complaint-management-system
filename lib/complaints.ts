import { ObjectId } from "mongodb";
import { getDb } from "./mongo";
import {
  COMPLAINT_CATEGORIES,
  COMPLAINT_PRIORITIES,
  type Complaint,
  type ComplaintCategory,
  type ComplaintPriority,
  type ComplaintStatus,
} from "./complaint-types";

type ComplaintDoc = {
  _id: ObjectId;
  userId: string;
  title: string;
  category: string;
  block: string;
  room: string;
  description: string;
  priority: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

function toComplaint(doc: ComplaintDoc): Complaint {
  return {
    _id: doc._id.toString(),
    userId: doc.userId,
    title: doc.title,
    category: doc.category as ComplaintCategory,
    block: doc.block,
    room: doc.room,
    description: doc.description,
    priority: doc.priority as ComplaintPriority,
    status: doc.status as ComplaintStatus,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
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


export async function createComplaintDoc(input: {
  userId: string;
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
    title,
    category: input.category,
    block,
    room,
    description,
    priority: input.priority,
    status: "open",
    createdAt: now,
    updatedAt: now,
  });
  return {
    _id: res.insertedId.toString(),
    userId: input.userId,
    title,
    category: input.category as ComplaintCategory,
    block,
    room,
    description,
    priority: input.priority as ComplaintPriority,
    status: "open",
    createdAt: now,
    updatedAt: now,
  };
}
