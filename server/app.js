import config from 'dotenv'
config.config();
import express from 'express';
const app=express();
import cors from 'cors'
import {db} from './config/dbconfig.js'
import userRoutes from './routes/userRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import errorMiddleware from './middleware/error.middleware.js';
import cloudinary from 'cloudinary'
import AppError from './utils/error.util.js';

app.use(express.json());//allowing json data to be sent
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],//allowed localhost:3000 client the access
  credentials:true
}));


app.use('/user',userRoutes);
app.use('/location',locationRoutes);
app.use('/movie',movieRoutes);
app.use('/book',bookingRoutes);

app.all('*',(req,res)=>{
    res.status(404).send('OOPS!!! 404 page not found');

})
app.use(errorMiddleware);

export default app;