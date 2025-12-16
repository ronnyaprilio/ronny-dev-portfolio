import clientPromise from "@/lib/mongodb";
import { Document, Filter, WithId } from "mongodb";

const DB_NAME = process.env.DB_NAME;

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */

type GetOneOptions<T extends Document> = {
  collection: string;
  filter: Filter<T>;
};

export async function getOne<T extends Document>({
  collection,
  filter = {},
}: GetOneOptions<T>): Promise<WithId<T> | null> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db.collection<T>(collection).findOne(filter);
}

export async function getMany<T extends Document>(
  collection: string,
  filter: Filter<T> = {}
): Promise<WithId<T>[]> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db
    .collection<T>(collection)
    .find(filter)
    .toArray();
}

/* -------------------------------------------------------------------------- */
/*                                    UPSERT                                  */
/* -------------------------------------------------------------------------- */

type UpsertOneOptions<T extends Document> = {
  collection: string;
  filter: Filter<T>;
  data: Partial<T>;
};

export async function upsertOne<T extends Document>({
  collection,
  filter,
  data,
}: UpsertOneOptions<T>) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const result = await db.collection<T>(collection).updateOne(
    filter,
    {
      $set: {
        ...data,
        updated_at: new Date(),
      },
    },
    { upsert: true }
  );

  return {
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
    upsertedId: result.upsertedId,
  };
}


/* -------------------------------------------------------------------------- */
/*                                    DELETE                                  */
/* -------------------------------------------------------------------------- */

type DeleteOneOptions<T extends Document> = {
  collection: string;
  filter: Filter<T>;
};

export async function deleteOne<T extends Document>({
  collection,
  filter,
}: DeleteOneOptions<T>) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const { deletedCount } = await db
    .collection<T>(collection)
    .deleteOne(filter);

  return { deletedCount };
}