import express from 'express';
import { login, logout, register, verifyUser } from '../controllers/auth-controller.js';
import validate from '../middlewares/validate-middleware.js';
import { loginSchema, registerSchema } from '../validate/auth-validate.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.route('/register').post(validate(registerSchema),register);
router.route('/login').post(validate(loginSchema),login);
router.route('/verify').get(authMiddleware,verifyUser);
router.route('/logout').post(authMiddleware,logout);

export default router;