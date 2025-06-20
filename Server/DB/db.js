import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to the database successfully");
    }
    catch(err){
        console.error("Error connecting to the database:", err);
    }
}

export default connectToDB;