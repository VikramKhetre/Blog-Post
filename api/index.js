import  express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import commentRoute from "./routes/commentRoute.js"
import cookieParser from "cookie-parser";
import postRoute from "./routes/postRoute.js"

dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log("db is connected sucessfully")
})
.catch((err)=>{
    console.log(err);
});

const app = express();

app.use(express.json())
app.use(cookieParser());

app.listen(8080,()=>{
    console.log("Lisnging at 8080!");
})

app.use("/api",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)
app.use("/api/comment",commentRoute)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    res.status(statusCode).json({
        sucess : false,
        statusCode,
        message,
    });
});
