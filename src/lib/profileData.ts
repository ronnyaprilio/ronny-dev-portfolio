import clientPromise from './mongodb';
import { WithId } from 'mongodb';

export interface ProfileData {
  name: string;
  greetings: string;
  description: string;
  about_me: string;
  metadata_title: string;
  metadata_description: string;
  copyright: string;
  github: string;
  linkedin: string;
  email: string;
}

export async function getProfile(): Promise<WithId<ProfileData>> {
  const client = await clientPromise;
  const db = client.db(); 
  const projects = await db.collection<ProfileData>('profile').findOne();
  if(!projects){
    throw Error("Profile data not found");
  }
  return projects;
}