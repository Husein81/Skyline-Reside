import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { NotFoundError, UnauthenticatedError} from '../error/index.js';
import asyncHandler from '../middleware/async-handler.js'
import generateToken from '../utils/generateToken.js';
import { StatusCodes } from 'http-status-codes';

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ username, email, password });
  if (!user) {
    res.status(400);
    throw new Error("Invalid data");
  }
  generateToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

export const signin = asyncHandler(async(req, res, next ) => {
  const { username, password } = req.body;
  try { 
    const user = await User.findOne({ username });
    if(!user)
      throw new NotFoundError('User not found');
    const vaildPassword =await bcryptjs.compare(password, user.password);
    if(!vaildPassword)
      throw new UnauthenticatedError('Invalid Ceedentials')
    
    const token = generateToken(res, user._id);

    const { password: pass,...rest } = user
    res.status(StatusCodes.OK).json({ rest ,token })
  }catch(error){
    next(error);
  }
})
//login with google
export const facebookSignIn = asyncHandler(async (req, res) => {
  const { username, email, photo } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    generateToken(res, user._id);
    const { password: pass, ...rest } = user;

    res.status(StatusCodes.OK).json(rest);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const newUser = await User.create({
      username:
        username.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email,
      password: generatedPassword,
      avatar: photo,
    });

    generateToken(res, newUser._id);
    const { password: pass, ...rest } = newUser._doc;
    res.status(StatusCodes.CREATED).json(rest);
  }
});
export const twitterSignIn = asyncHandler(async (req, res) => {
  const { username, email, photo } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    generateToken(res, user._id);
    const { password: pass, ...rest } = user;

    res.status(StatusCodes.OK).json(rest);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const newUser = await User.create({
      username:
        username.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email,
      password: generatedPassword,
      avatar: photo,
    });

    generateToken(res, newUser._id);
    const { password: pass, ...rest } = newUser._doc;
    res.status(StatusCodes.CREATED).json(rest);
  }
});
export const googleSignIn = asyncHandler(async(req, res) => {
  const { username, email, photo } = req.body;
  const user = await User.findOne({ email })

  if(user){
    generateToken(res,user._id);
    const { password:pass, ...rest } = user;

    res.status(StatusCodes.OK).json(rest);
  } 
  else{
    const generatedPassword =
    Math.random().toString(36).slice(-8) + 
    Math.random().toString().slice(-8);

    const newUser = await User.create({
      username:username.splite(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-4),
      email,
      password: generatedPassword,
      avatar: photo,
    });
    generateToken(res, newUser._id);
    const { password:pass, ...rest} = newUser._doc;
    res.status(StatusCodes.CREATED).json(rest);
  }
});

// sign ut
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};