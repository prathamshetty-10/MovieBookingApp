import {Router} from 'express';
import {lockSeat,unlockSeat,confirmBooking,cancelBooking,getBookings,getAllBookings} from '../controllers/bookingControllers.js'
import { isLoggedIn,authorizedRoles}  from "../middleware/auth.middleware.js";
const router=Router();
router.route('/lockSeat').post(isLoggedIn,lockSeat);
router.route('/unlockSeat').post(isLoggedIn,unlockSeat);
router.route('/confirmBooking').post(isLoggedIn,confirmBooking);
router.route('/cancelBooking/:id').get(isLoggedIn,cancelBooking);//show unlock seats button and then display cancel booking
router.route('/getBookings').get(isLoggedIn,getBookings);
router.route('/getAllBookings')
.get(isLoggedIn,authorizedRoles("ADMIN"),getAllBookings);
export default router;