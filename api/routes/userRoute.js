import express from "express";
const router = express.Router();
import {
  test,
  updateUser,
  deleteUser,
  signout,
  getUser
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

router.get("/test", test);
router.put("/user/update/:userId", verifyToken, updateUser);
router.delete("/user/delete/:userId", verifyToken, deleteUser);
router.post("/user/signout", signout);
router.get('/user/getUsers',verifyToken,getUser)

export default router;
