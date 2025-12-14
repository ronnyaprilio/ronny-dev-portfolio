import { ProfileData } from '@/types/profile';
import clientPromise from './mongodb';
import { WithId } from 'mongodb';

export async function getProfile(): Promise<WithId<ProfileData>> {
  const client = await clientPromise;
  const db = client.db(); 
  const projects = await db.collection<ProfileData>('profile').findOne();
  if(!projects){
    throw Error("Profile data not found");
  }
  return projects;
}