import {Router} from 'express';
import {lockSeat,unlockSeat,confirmBooking,cancelBooking,getBookings,getAllBookings} from '../controllers/bookingControllers.js'
import { isLoggedIn,authorizedRoles}  from "../middleware/auth.middleware.js";
const router=Router();
router.route('/lockSeat/:id').post(isLoggedIn,lockSeat);
router.route('/unlockSeat/:id').post(isLoggedIn,unlockSeat);
router.route('/confirmBooking/:id/:num').post(isLoggedIn,confirmBooking);
router.route('/cancelBooking/:id').get(isLoggedIn,cancelBooking);//show unlock seats button and then display cancel booking
router.route('/getBookings').get(isLoggedIn,getBookings);
router.route('/getAllBookings')
.post(isLoggedIn,authorizedRoles("ADMIN"),getAllBookings);
export default router;