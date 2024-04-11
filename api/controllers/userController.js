import { errorHandler } from "../utils/error.js";
import bcriptjs from "bcryptjs"
import User from "../models/users.model.js"

export const test = (req,res)=>{
    res.json({message:"controller working"})
};

export const updateUser = async (req,res,next)=>{
    console.log(req.body)
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, "u are not allowed to update this user"))
    }
    if(req.body.password){
        if(req.body.password.length<6){
            return next(errorHandler(400,'password must be at least 6 characters'));
        }
        req.body.password = bcriptjs.hashSync(req.body.password,10);
    }
    if(req.body.username){
        if(req.body.username.length<3 || req.body.username.length>20){
            return next(errorHandler(400,"username must be between 3 and 20 characters"))
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, "username cannot contain spaces"))
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400,"username must constian only numbers and letters"))
        }
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
              $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
              },
            },
            { new: true }
          );
          const { password, ...rest } = updatedUser._doc;
          res.status(200).json(rest);

    }catch(error){
        next(error)
    }
}