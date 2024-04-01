import AppError from '../utils/error.util.js';

import {db} from '../config/dbconfig.js'

import asyncHandler from '../middleware/asyncHandler.middleware.js';
const places=asyncHandler(async(req,res,next)=>{
    try{
    const sql1='select * from location';
    await db.query(sql1,(err,data)=>{
        if(err)return res.json(err);
        if(!data[0]) return next(new AppError("location doesnt exist",400));
        res.status(200).json({
            success:true,
            message:"all locations",
            locations:data,
        })

    })
    }
    catch(e){
        return next(new AppError("failed to fetch location details",500));
    }


});
const theatres=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const sql1=`select * from theatre where loc_id='${id}'`;
    await db.query(sql1,(err,data)=>{
        if(err)return res.json(err);
        if(!data[0]) return next(new AppError("theatre in location doesnt exist",400));
        res.status(200).json({
            success:true,
            message:"all theatres in given location",
            theatres:data,
        })

    })
    }
    catch(error){
        return next(new AppError(error.message,400));
    }

};
export {places,theatres}