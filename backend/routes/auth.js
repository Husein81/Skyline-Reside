import express from 'express';
import {  facebookSignIn, googleSignIn, signOut, signin, signup, twitterSignIn } from '../controllers/auth.js';

const router = express.Router();

router.post("/signup", signup);
router.post('/signin', signin);
router.post('/google', googleSignIn);
router.post('/facebook', facebookSignIn);
router.post('/twitter', twitterSignIn);
router.get('/signout', signOut);

export default router;