import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Mongodb");
    } catch (error) {
        console.error("Error connecting to Mongodb: "+ error);
        process.exit(1);
    }
}

export default connectDB;