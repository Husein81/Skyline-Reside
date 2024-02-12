import express from 'express';
import { createListing, deleteListing, getAllListings, getListingById, updateListing } from '../controllers/listing.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/get',getAllListings);
router.get('/get/:id',getListingById);
router.post('/create', createListing);
router.put('/update/:id',isAuthenticatedUser, updateListing);
router.delete('/delete/:id',isAuthenticatedUser, deleteListing);

export default router;