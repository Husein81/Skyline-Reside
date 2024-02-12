import bcryptjs from 'bcryptjs';
import User from '../models/user.js';
import { BadRequestError, NotFoundError } from '../error/index.js';
import { StatusCodes } from 'http-status-codes';
import Listing from '../models/listing.js';
import asyncHandler from '../middleware/async-handler.js'


export const updateUser = asyncHandler(async(req, res) => {
  try {
    const { avatar, username, email, password } = req.body;
    const user = await User.findById(req.params.id);
    if(!user){
      throw new NotFoundError("User not found!");
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    if(password){
      user.password = password;  
    }
    const updatedUser = await user.save();
    const { password: pass, ...rest} = updatedUser._doc;
    res.status(StatusCodes.OK).json(rest);
  } catch (error) {

    console.log(error);
  }
});

export const deleteUser = async (req, res, next) => {
  
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(StatusCodes.OK).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getUserListings = asyncHandler(async (req, res) => {
    const paramId = req.params.id;

    try {
      const listings = await Listing.find({ userRef: paramId });
      res.status(StatusCodes.OK).json(listings);
    } catch (error) {
      next(error);
    }
});

export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(StatusCodes.OK).json(rest);
  } catch (error) {
    next(error);
  }
}; 