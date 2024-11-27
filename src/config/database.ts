import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb://127.0.0.1:27017/school?directConnection=true";

export async function connectDB() {
  await connectToCluster(MONGODB_URI);
}

import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb://localhost:27017"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("my_database"); // Replace with your database name
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    throw error;
  }
};

export default client;
