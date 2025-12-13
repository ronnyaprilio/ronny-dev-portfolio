import { Lucia } from 'lucia';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import clientPromise from '@/lib/mongodb';

const client = await clientPromise;
const db = client.db(); // atau client.db('nama-db-kamu')

if(!process.env.DB_TABLE_LUCIA_SESSIONS){
  throw Error("Configuration Error : could not find Environtment DB_TABLE_LUCIA_SESSIONS");
}

if(!process.env.DB_TABLE_LUCIA_USERS){
  throw Error("Configuration Error : could not find Environtment DB_TABLE_LUCIA_USERS");
}

const adapter = new MongodbAdapter(
  db.collection(process.env.DB_TABLE_LUCIA_SESSIONS),
  db.collection(process.env.DB_TABLE_LUCIA_USERS)
);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}