import User from "../models/users.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req,res,next)=>{

    const {username , email, password} = req.body;

    if(!username || !email || !password || username==="" || email==="" || password===""){
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
        res.json('sucessfull signup')
    } catch(error){
       next(error)
    }
}

export const signin = async(req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password || email==="" ||password===""){
        next(errorHandler(400,"All fields are required"));
        
    }

    try{    
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"invalid credentials"))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"invalid credentials"))
        }

        const token = jwt.sign(
            {id:validUser._id},process.env.JWT_SECRET
        );

        // to hide password from sharing back to res
        const {password: pass, ...rest}=validUser._doc

        res.status(200).cookie('access_token',token,{
            httpOnly:true
     // here we pass rest to hide password
        }).json(rest)

    }catch(error){
        next(error)
    }

}