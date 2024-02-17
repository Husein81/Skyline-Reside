import { UnauthenticatedError } from "../error/index.js";
import asyncHandler from "./async-handler.js";
import jwt from 'jsonwebtoken';
import User from "../models/user.js";

export const isAuthenticatedUser = asyncHandler(async(req, res,next) => {
    const token =req.cookies.jwt // Extract token from 'Bearer <token>'
   
    if(!token){
        throw new UnauthenticatedError('Login first to access this resource');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next()
})

export const authorizedRoles = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            throw new UnauthenticatedError(`Role (${req.user.role}) is not allowed to access this resource`)
        }
        next()
    }
}