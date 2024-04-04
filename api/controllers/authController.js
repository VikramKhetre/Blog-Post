import User from "../models/users.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res,next)=>{

    const {username , email, password} = req.body;

    if(!username || !email || !password || username==="" || email===""){
        next(errorHandler(400,"All fields are required"));
        
    }

    const hashedPwd = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password: hashedPwd
    });


    try{
        await newUser.save();
        console.log("signup sucessfull");
    } catch(error){
       next(error)
    }
}