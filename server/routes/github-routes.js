import express from 'express';
import { fetchTreeData, getRepoInfo } from '../controllers/github-controller.js';
import { verifyMiddleware } from '../middlewares/verify-middleware.js';

const router = express.Router();

router.route('/info').post(verifyMiddleware,getRepoInfo);
router.route('/dataTree').post(fetchTreeData);

export default router;