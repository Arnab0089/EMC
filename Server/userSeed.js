import User from "./models/User.js";
import bcrypt from "bcryptjs";
import connectToDB from "./DB/db.js";

const userRegister = async () =>{
    await connectToDB();
    try{
        const email = "admin@gmail.com"; // manually define
        const existingUser = await User.findOne({ email });

        if (existingUser) {
        console.log("User already exists with email:", email);
        return;
        }

        const hashPassword = await bcrypt.hash("admin123", 10);

        const newUser = new User({
        username: "Admin",
        email: email,
        password: hashPassword,
        role: "admin",
        });

        await newUser.save()
    }catch(err){
        console.error("Error in user registration:", err);
    }
}

export default userRegister;