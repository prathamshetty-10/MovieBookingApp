import {Router} from 'express';
import {addMovie, getMovies,addShow,getShow,addSeat,addLoc,getSeat} from '../controllers/MovieControllers.js'
import { isLoggedIn,authorizedRoles}  from "../middleware/auth.middleware.js";

import {upload } from "../middleware/multer.middleware.js"
const router=Router();
router.route('/getMovie/:id').get(isLoggedIn,getMovies);//id is th_id
router.route('/addMovie')//id is th_id
.post(isLoggedIn,authorizedRoles("ADMIN"),upload.single('thumbnail'),addMovie);
router.route('/addLoc')//id is th_id
.post(upload.single('thumbnail'),addLoc);
router.route('/addShow')//id is th_id also add moviename without quotes with spaces in the route
.post(isLoggedIn,authorizedRoles("ADMIN"),addShow);
router.route('/getShow/:id/:name').get(isLoggedIn,getShow);//id is th_id
router.route('/addSeat')//tim id
.post(isLoggedIn,authorizedRoles("ADMIN"),addSeat);
router.route('/getSeat/:id').get(isLoggedIn,getSeat);
export default router;