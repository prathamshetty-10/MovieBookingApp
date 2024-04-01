import {Router} from 'express';
import {register,login,logout,getProfile} from '../controllers/userControllers.js'
import { isLoggedIn}  from "../middleware/auth.middleware.js";
const router=Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.get('/logout',isLoggedIn,logout);
router.get('/profile',isLoggedIn,getProfile);
export default router;