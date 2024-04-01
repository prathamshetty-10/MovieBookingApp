import AppError from '../utils/error.util.js';
import {db} from '../config/dbconfig.js'
import fs from 'fs/promises'
import cloudinary from 'cloudinary'
const addMovie=async(req,res,next)=>{
    try{
    const {id}=req.params;
    const {mov_name,mov_desc,rating}=req.body;
    let public_id;
    let secure_url;
    if(!mov_name||!mov_desc ||!rating){
        return next(new AppError("all fields are mandatory",400));
    }
    if(req.file){
        
        try{
            const result=await cloudinary.v2.uploader.upload(req.file.path,{//arguments path to upload and configuration
                folder:'lms',
                width: 250,
                height:250,//the cloudinary image will be cropped 
                gravity:"faces",
                crop:'fill'
            });
            
            if(result){
                public_id=result.public_id;
                secure_url=result.secure_url;
                //remove file from uploads folder na
                fs.rm(`uploads/${req.file.filename}`);
            }
            
            

        }
        catch(error){
            new AppError(error || "file not uploaded please try again",500);

        }
    }
    const sql=`insert into movie values(${id},'${mov_name}','${mov_desc}',${rating},'${public_id}','${secure_url}')`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully added movie",
            data:data
        })
    })
  
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
const getMovies=async(req,res,next)=>{
    try{
    const {id}=req.params;
    const sql=`select * from movie where th_id=${id}`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully obtained movies",
            movies:data
        })
    })
   
    
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
const addShow=async(req,res,next)=>{
    try{
    const {id}=req.params;
    const {name}=req.params;
    const {timingstart,ts_1,timingend,te_1}=req.body;
    const tim_id=id.toString()+`${name}`+timingstart.toString()+ts_1+timingend.toString()+te_1;
    
    if(!name||!timingend ||!timingstart||!ts_1||!te_1 ||!tim_id){
        return next(new AppError("all fields are mandatory",400));
    }
    
    const sql=`insert into timing(th_id,mov_name,time_id,timingstart,ts_1,timingend,te_1) values(${id},'${name}','${tim_id}',${timingstart},'${ts_1}',${timingend},'${te_1}')`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully added a show for movie",
            data:data
        })
    })
  
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
const getShow=async(req,res,next)=>{
    try{
    const {id}=req.params;
    const {name}=req.params;
    const sql=`select * from timing where th_id=${id} and mov_name='${name}'`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully obtained shows",
            movies:data
        })
    })
   
    
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
const addSeat=async(req,res,next)=>{
    try{
    const {id}=req.params;
    const {num_seats}=req.body;
    if(!num_seats){
        return next(new AppError("all fields are mandatory",400));
    }
    
    const sql=`insert into seat values('${id}',${num_seats})`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully added seats for movie show",
            data:data
        })
    })
  
    }
    catch(err){
        return next(new AppError(err,400));
    }


};
export {addMovie,getMovies,addShow,getShow,addSeat}