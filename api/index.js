import  express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js"

dotenv.config();

mongoose.connect(process.env.MONGO)
.then((res)=>{
    console.log("db is connected sucessfully")
})
.catch((err)=>{
    console.log(err);
});

const app = express();

app.listen(8080,()=>{
    console.log("Listinging at 8080!");
})

app.use("/api",userRoute)