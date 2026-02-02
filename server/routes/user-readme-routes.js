import express from 'express';
import {fetchUserReadmes,fetchReadmeById, updateReadme, deleteReadme} from "../controllers/user-readme-controller.js"
import authMiddleware from '../middlewares/auth-middleware.js';
const router = express.Router();

router.route('/readmes').get(authMiddleware,fetchUserReadmes);
router.route('/readme/:id').get(authMiddleware,fetchReadmeById);
router.route('/readme/edit/:id').put(authMiddleware,updateReadme);
router.route('/readme/delete/:id').delete(authMiddleware,deleteReadme);

export default router;