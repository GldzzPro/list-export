import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'reports';

export async function connectDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    console.log('MongoDB connected');
    return client.db(DB_NAME);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}