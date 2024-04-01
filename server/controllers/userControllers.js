import AppError from '../utils/error.util.js';

import {db} from '../config/dbconfig.js'
import JWT from "jsonwebtoken"
import asyncHandler from '../middleware/asyncHandler.middleware.js';
//to access anything from data coming from query do data[0].password
const cookieOption={
    maxAge:10*24*60*60*1000,
    httpOnly:true,
    sameSite:'none',
    //secure:true
   
};

function generateJWTToken(useremail,phone,role){
    return JWT.sign({
        
        user_email:useremail,
        ph_no:phone,
        user_role:role,
    },
    process.env.JWT_SECRET,//secret key
    {expiresIn:process.env.JWT_EXPIRY}//for security dont keep permanent tokens
    )
}
const confirm=asyncHandler(async(req,res,next)=>{
    try{
    const {user_email}=req.body;
    if(!user_email){
        return next(new AppError("all fields mandatory",400));
    }
    const sql=`select * from user where user_email='${user_email}'`;
    db.query(sql,(err,data)=>{
        if(err)return res.json(err);
        if(data[0]){
            return next(new AppError("email already exists choose another email",400));
        }
        res.status(200).json({
            success:true,
            message:"email is free preoceed to register",
            data:data
        })
    })
    
    }
    catch(err){
        return next(new AppError(err,400));
    }
});
const register=asyncHandler(async(req,res,next)=>{
    try{
    const {user_email,user_name,ph_no,password}=req.body;
    if(!user_email || !password||!user_name||!ph_no){
        return next(new AppError("all fields mandatory",400));
    }
    
    const sql1=`insert into user(user_email,user_name,ph_no,password) values('${user_email}','${user_name}',${ph_no},'${password}')`;
    db.query(sql1,(err,data)=>{
        if(err)return res.json(err);
        res.status(200).json({
            success:true,
            message:"successfully registered user",
            data:data
        })
    })}
    catch(err){
        return next(new AppError(err,400));
    }
});
const login=asyncHandler(async(req,res,next)=>{
    try{
    let data1;
    const {user_email,password,ph_no,user_role}=req.body;
    if(!user_email || !password ||!ph_no || !user_role){
        return next(new AppError("all fields mandatory",400));
    }
    //password match
    const sql1=`select * from user where user_email='${user_email}'`;
    await db.query(sql1,(err,data)=>{
        if(err)return res.json(err);
        if(!data[0]) return next(new AppError("email doesnt exist",400));
        if(user_role=='ADMIN' && data[0].user_role !='ADMIN')return next(new AppError("Not an admin.Please login as a user",400));
        
        if(data[0].password!=password){
            
            return next(new AppError("credentials do not match",400));
        
        }
        const token= generateJWTToken(user_email,ph_no,user_role);
        
        res.cookie('access-token',token,cookieOption);
        res.status(200).json({
            success:true,
            message:"user logged in successfully",
            user:data,
        })

    })
    

    
    }
    catch(error){
        return next(new AppError(error.message,500));
    }

});
const logout=(req,res,next)=>{
    try{
        const cookieOptions={
            expires:new Date(),
            secure:true,
            maxAge:0,
            httpOnly:true
        };
        res.cookie("access-token",null,cookieOptions);
        res.status(200).json({
            success:true,
            message:"logged out sucessfully"
            
        })

    }
    catch(error){
        return next(new AppError("error in logging out",400));
    }

};
const getProfile=async(req,res,next)=>{
    try{//gotta know who is user from cookie na in is logged in details are put into req.user
    const user_email=req.user.user_email;
    
    const sql1=`select * from user where user_email='${user_email}'`;
    await db.query(sql1,(err,data)=>{
        if(err)return res.json(err);
        if(!data[0]) return next(new AppError("email doesnt exist",400));
        res.status(200).json({
            success:true,
            message:"user details",
            user:data,
        })

    })
    }
    catch(e){
        return next(new AppError("failed to fetch profile details",500));
    }


};
export{register,login,logout,getProfile,confirm}