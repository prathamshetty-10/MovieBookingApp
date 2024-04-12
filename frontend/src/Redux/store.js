import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice"
import locationSliceReducer from "./Slices/LocationSlice"
import theatreSliceReducer from "./Slices/TheatreSlice";
import movieSliceReducer from "./Slices/MovieSlice";
import timingSliceReducer from "./Slices/TimingSlice";
import bookingSliceReducer from './Slices/BookingSlice'
const store=configureStore({
    reducer:{
        auth1:authSliceReducer,
        locations:locationSliceReducer,
        theatres:theatreSliceReducer,
        movies:movieSliceReducer,
        timings:timingSliceReducer,
        bookings:bookingSliceReducer
    },
    devTools:true,
});
export default store;