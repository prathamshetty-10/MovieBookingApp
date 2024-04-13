import AppError from '../utils/error.util.js';
import {db} from '../config/dbconfig.js'
const lockSeat=async(req,res,next)=>{
    try{
    
    const {time_id,num_seats}=req.body;
    if(!num_seats){
        return next(new AppError("all fields are mandatory",400));
    }
    const sql=`update seat set num_seats=num_seats-${num_seats} where time_id='${time_id}'`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        
        res.status(200).json({
            success:true,
            message:"successfully locked seat",
            data:data
        })
    })
  
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
const unlockSeat=async(req,res,next)=>{
    try{
    
    const {time_id,num_seat}=req.body;
    if(!num_seat || !time_id){
        return next(new AppError("all fields are mandatory",400));
    }
    const sql=`update seat set num_seats=num_seats+${num_seat} where time_id='${time_id}'`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully unlocked seat",
            data:data
        })
    })
  
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
const confirmBooking=async(req,res,next)=>{
    try{
    const {time_id,num_seats}=req.body;
    const user_email=req.user.user_email;
    const ph_no=req.user.ph_no;

    if(!user_email||!ph_no){
        return next(new AppError("all fields are mandatory",400));
    }
    const sql=`insert into booking values('${user_email}',${ph_no},${num_seats},'${time_id}')`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully booked seat",
            data:data
        })
    })
  
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
const cancelBooking=async(req,res,next)=>{
    try{
    const {time_id,user_email,ph_no,num_seat}=req.body;
    const sql1=`delete from booking where time_id='${time_id}' and user_email='${user_email}' and ph_no=${ph_no} and num_seat=${num_seat} `;
    db.query(sql1,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully cancelled booked seat",
            data:data
        })
    })
    
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
const getBookings=async(req,res,next)=>{
    try{
    const user_email=req.user.user_email;
    const sql=`select * from booking where user_email='${user_email}'`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully obtained bookings",
            bookings:data
        })
    })
   
    
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
const getAllBookings=async(req,res,next)=>{
    try{
    
    const sql=`select * from booking`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully obtained bookings",
            AllBookings:data
        })
    })
   
    
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
export {lockSeat,unlockSeat,confirmBooking,cancelBooking,getBookings,getAllBookings}