import clientPromise from "@/lib/mongodb";
import { ObjectId, type Document } from "mongodb";

export async function getCollection<T extends Document>(name: string) {
  const client = await clientPromise;
  return client.db().collection<T>(name);
}

export function toObjectId(id: string) {
  return new ObjectId(id);
}
