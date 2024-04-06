import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    profilePicture:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.xo-BCC1ZKFpLL65D93eHcgHaGe?w=217&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
},{timestamps:true});

const User = mongoose.model("User",userSchema)
export default User;