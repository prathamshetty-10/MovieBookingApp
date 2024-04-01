import {Router} from 'express';
import {places,theatres} from '../controllers/locationControllers.js'
import { isLoggedIn}  from "../middleware/auth.middleware.js";
const router=Router();
router.route('/choose').get(isLoggedIn,places);
router.route('/choose/:id').get(isLoggedIn,theatres);
export default router;