import express from "express";
const router = express.Router();
import {
  test,
  updateUser,
  deleteUser,
  signout,
  getUser,
  getUsers
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get('/getUsers',verifyToken,getUsers)
router.get('/:userId', getUser);

export default router;
