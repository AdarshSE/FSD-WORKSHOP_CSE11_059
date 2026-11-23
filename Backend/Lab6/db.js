import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connecting = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri || !uri.startsWith("mongodb")) {
            throw new Error("Invalid or missing MONGO_URI in .env");
        }

        await mongoose.connect(uri);

        console.log("MongoDB Connected Successfully");

    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
        throw error;
    }
};

export default connecting;