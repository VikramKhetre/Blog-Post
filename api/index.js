import  express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"

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

app.listen(8080,()=>{
    console.log("Lisnging at 8080!");
})

app.use("/api",userRoute)
app.use("/api/auth",authRoute)