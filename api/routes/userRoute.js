import express from "express"
const router = express.Router();
import {test,updateUser,deleteUser} from "../controllers/userController.js"
import {verifyToken} from "../utils/verifyUser.js"

router.get("/test",test)
router.put("/user/update/:userId",verifyToken,updateUser)
router.delete("/user/delete/:userId",verifyToken,deleteUser)

export default router
