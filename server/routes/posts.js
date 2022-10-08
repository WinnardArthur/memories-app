import express from 'express';
import { getPost, getSinglePost, getPostBySearch, createPost, updatePost, deletePost, likePost, commentPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPost);
router.get('/search', getPostBySearch);
router.get('/:id', getSinglePost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', auth, commentPost)

export default router;