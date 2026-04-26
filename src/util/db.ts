import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async() => {
     try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");
    } catch (err){
        console.log("MongoDB connection error:", err);
        // process.exit(1);
    }
}