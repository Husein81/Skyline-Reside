import express from 'express'
import { deleteUser, getUser, getUserListings, updateUser } from '../controllers/user.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id',getUser)
router.get("/listings/:id", getUserListings);
router.put('/update/:id',isAuthenticatedUser,updateUser);
router.delete('/delete/:id',isAuthenticatedUser,deleteUser);


export default router; 