import { errorHandler } from "../utils/error.js";
import bcriptjs from "bcryptjs"
import User from "../models/users.model.js"

export const test = (req,res)=>{
    res.json({message:"controller working"})
};

export const updateUser = async (req,res,next)=>{
    // console.log(req.body)
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

export const deleteUser = async (req,res,next)=>{
    // conditon for both routes delte from admin & delte by user own
    if(!req.user.isAdmin && req.user.id !== req.params.userId){
        return next(errorHandler(403, "u are not allowed to update this user"));
    }
    try{
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({message:'User deleted Successfully'});
    }catch(error){
        next(error)
    }
}

export const signout = (req,res,next)=>{
    try{
        res.clearCookie('access_token');
        res.status(200).json('user has been signout');
    }catch(error){
        next(error);
    }
}

export const getUsers = async(req,res,next)=>{
    if(!req.user.isAdmin){
        next(errorHandler(403,"not allowed to get user"))
    }
    try{
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sortDirection === 'asc' ? 1:-1; 

        const users = await User.find()
        .sort({createdAt:sortDirection})
        .skip(startIndex)
        .limit(limit)

        // here to remove password from the users
        const userWithoutPassword =  users.map((user)=>{
            const{password,...rest} = user._doc
            return rest;
        });

        const totalUsers = await User.countDocuments();

        // total users for previous month

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        });
        
        res.status(200).json({
            users:userWithoutPassword,
            totalUsers,
            lastMonthUsers
        });

    }catch(error){
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return next(errorHandler(404, 'User not found'));
      }
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };