import { Project } from '@/types/project';
import clientPromise from './mongodb';
import { WithId } from 'mongodb';

export const PROJECT_COLLECTION_NAME = process.env.DB_TABLE_PROJECT_COLLECTION_NAME!;

export async function getProjects(): Promise<WithId<Project>[]> {
  const client = await clientPromise;
  const db = client.db(); 
  const projects = await db.collection<Project>(PROJECT_COLLECTION_NAME).find({}).toArray();
  return projects;
}