import express from 'express';
import { getRepoInfo } from '../controllers/github-controller.js';
import { verifyMiddleware } from '../middlewares/verify-middleware.js';

const router = express.Router();

router.route('/info').post(verifyMiddleware,getRepoInfo);

export default router;