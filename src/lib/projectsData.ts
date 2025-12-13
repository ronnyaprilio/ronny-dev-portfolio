import clientPromise from './mongodb';
import { WithId } from 'mongodb';

export interface Project {
  title: string;
  image: string;
  description: string;
}

export async function getProjects(): Promise<WithId<Project>[]> {
  const client = await clientPromise;
  const db = client.db(); 
  const projects = await db.collection<Project>('projects').find({}).toArray();
  return projects;
}