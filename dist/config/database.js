"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongodb_1 = require("mongodb");
const MONGODB_URI = process.env.MONGODB_URI ||
    "mongodb://localhost:27017/school?directConnection=true";
async function connectDB() {
    try {
        const client = await mongodb_1.MongoClient.connect(MONGODB_URI);
        console.log("MongoDB connected");
        return client.db();
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}
