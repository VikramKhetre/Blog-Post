import express from 'express';
import { create,getPosts,deletePost,updatePost } from '../controllers/postController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken,create)
router.get('/getPosts',getPosts)
router.delete('/deletePost/:postId/:userId',verifyToken,deletePost)
router.put('/updatePost/:postId/:userId',verifyToken,updatePost)

export default router;