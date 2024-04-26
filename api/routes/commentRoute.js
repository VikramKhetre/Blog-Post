import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, getPostComment } from '../controllers/commentController.js';

const router = express.Router();


router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId',getPostComment)
export default router;