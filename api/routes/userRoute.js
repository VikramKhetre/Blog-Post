import express from "express"
const router = express.Router();
import {test,updateUser} from "../controllers/userController.js"
import {verifyToken} from "../utils/verifyUser.js"

router.get("/test",test)
router.put("/user/update/:userId",verifyToken,updateUser)

export default router
