import type { Document } from "mongodb";
import { ObjectId } from "mongodb";
import { getCollection, toObjectId } from "./db";

export async function findAll<T extends Document>(
  collection: string
): Promise<(T & { _id: string })[]> {
  const col = await getCollection<Document>(collection);
  const data = await col.find({}).toArray();

  return data.map((d) => ({
    ...(d as unknown as T),
    _id: d._id.toString(),
  }));
}

export async function findById<T extends Document>(
  collection: string,
  id: string
): Promise<(T & { _id: string }) | null> {
  const col = await getCollection<Document>(collection);

  let data: Document | null;

  if (ObjectId.isValid(id)) {
    data = await col.findOne({ _id: new ObjectId(id) });
  } else {
    data = await col.findOne({ _id: id as any });
  }

  if (!data) return null;

  return {
    ...(data as unknown as T),
    _id: data._id.toString(),
  };
}

export async function createOne<T extends Document>(
  collection: string,
  payload: T
): Promise<string> {
  const col = await getCollection<Document>(collection);
  const res = await col.insertOne(payload);
  return res.insertedId.toString();
}

export async function updateById<T extends Document>(
  collection: string,
  id: string,
  payload: Partial<T>
): Promise<void> {
  const col = await getCollection<Document>(collection);

  const filter = ObjectId.isValid(id)
    ? { _id: new ObjectId(id) }
    : { _id: id };

  await col.updateOne(filter as any, {
    $set: payload,
  });
}

export async function deleteById(
  collection: string,
  id: string
): Promise<void> {
  const col = await getCollection<Document>(collection);

  await col.deleteOne({
    _id: toObjectId(id),
  });
}
