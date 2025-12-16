import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import crypto from 'node:crypto';
import path from 'path'
dotenv.config({ path: path.resolve('.env.local') });

const uri = process.env.MONGODB_URI;
const collectionNameProjects = process.env.DB_TABLE_PROJECT_COLLECTION_NAME;
const collectionNameProfile = process.env.DB_TABLE_PROFILE_COLLECTION_NAME;
const collectionNameAdminUser = process.env.DB_TABLE_LUCIA_USERS;

async function hashUserPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 64);

  return `${hashedPassword.toString('hex')}:${salt}`;
}



if (!uri || !collectionNameProjects || !collectionNameProfile) {
  console.error('MONGODB_URI or DB_TABLE_PROJECT_COLLECTION_NAME not found');
  process.exit(1);
}

async function seed_profile() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const profileCollection = db.collection(collectionNameProfile);

    const count = await profileCollection.countDocuments();
    if (count === 0) {
      await profileCollection.insertOne(
        {
            _id: "main-profile",
            name: "Ronny Aprilio",
            greetings: "Hi, I'm Ronny",
            description: "Fullstack Developer | Java, Next.js, TypeScript, Tailwind CSS | AWS",
            about_me: 
            `I’m a Fullstack Developer with over 9 years of experience in backend development using Java and modern web technologies. Recently, I’ve expanded my skill set to include Next.js, TypeScript, and React, allowing me to build end-to-end applications with scalable architectures and clean, maintainable code."
            My background includes hands-on experience with AWS, API design, and system optimization — skills that enable me to bridge backend reliability with a smooth frontend user experience. I’m passionate about writing efficient code, learning continuously, and delivering real business value through technology.
            I’m currently open for remote work opportunities with US-based teams, especially those looking for engineers who thrive in fast-paced environments and take ownership of complex technical challenges.`,
            metadata_title: "Ronny Aprilio - Portfolio",
            metadata_description: "Fullstack Developer | Java, Next.js, TypeScript, Tailwind CSS | AWS",
            copyright: "© Ronny Aprilio. All rights reserved.",
            github: "https://github.com/ronnyaprilio",
            linkedin: "https://www.linkedin.com/in/ronny-aprilio/",
            email: "mailto:ronny@kazumaronz.com",
        }
      );
      console.log('Profile Data seeded successfully!');
    } else {
      console.log('Profile Data already has data.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

async function seed_projects() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const projectCollection = db.collection(collectionNameProjects);

    const count = await projectCollection.countDocuments();
    if (count === 0) {
      await projectCollection.insertMany([
        {
          title: "AI Chatbot with Mistral & OpenAI",
          image: "/project1-tilabotID_ftzbte.png",
          description: "A smart AI chatbot built using Mistral and OpenAI, capable of natural language interactions and dynamic responses.",
        },
        {
          title: "Personal Portfolio Website",
          image: "/project2-profile-portofolio_pcltpc.png",
          description: "My professional portfolio showcasing personal projects, skills, and achievements, built with Next.js, TypeScript, and Tailwind CSS.",
        },
        {
          title: "Real Estate Marketing Platform",
          image: "/project3-real-estate_obxosu.png",
          description: "A responsive website designed to showcase real estate listings, optimized for user engagement and lead generation.",
        },
      ]);
      console.log('Projects Data seeded successfully!');
    } else {
      console.log('Projects Data already has data.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

async function seed_admin() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const adminUserCollection = db.collection(collectionNameAdminUser);
    const count = await adminUserCollection.countDocuments();

    const username = process.env.INIT_USERNAME_ADMIN;
    let password = process.env.INIT_PASSWORD_ADMIN;
    const hashedPassword = await hashUserPassword(password);
    if (count === 0) {
      await adminUserCollection.insertOne(
        {
            _id: username,
            username,
            password: hashedPassword,
            role: 'admin',
            createdAt: new Date(),
        }
      );
      console.log('Admin User data seeded successfully!');
    } else {
      console.log('Admin User data already has data.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed_profile();
seed_projects();
seed_admin();