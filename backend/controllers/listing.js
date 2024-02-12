import { StatusCodes } from 'http-status-codes';
import asyncHandler from '../middleware/async-handler.js'
import Listing from '../models/listing.js';
import { NotFoundError } from '../error/index.js'

export const createListing = asyncHandler(async(req, res, next) => {
    const listing = await Listing.create(req.body);

    res.status(StatusCodes.CREATED).json(listing);
});

export const getAllListings = asyncHandler(async(req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
          offer = { $in: [false, true] };
        }
        
        let furnished = req.query.furnished;
        
        if (furnished === undefined || furnished === 'false') {
          furnished = { $in: [false, true] };
        }
        
        let parking = req.query.parking;
        
        if (parking === undefined || parking === 'false') {
          parking = { $in: [false, true] };
        }
        
        let type = req.query.type;
        
        if (type === undefined || type === 'all') {
          type = { $in: ['sale', 'rent'] };
        }
        
        const searchTerm = req.query.searchTerm || '';
        
        const sort = req.query.sort || 'createdAt';
        
        const order = req.query.order || 'desc';
        
        const listings = await Listing.find({
          title: { $regex: searchTerm, $options: "i" } ,
          offer,
          furnished,
          parking,
          type,
        })
        .sort({ [sort]: order })
        .skip(startIndex)
        .limit(limit);   
    
        return res.status(StatusCodes.OK).json(listings);
    }catch (error) {
      next(error);
    }
});
export const getListingById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById( id );

    if(!listing)
       throw new NotFoundError("Listing Not Found!");
    res.status(StatusCodes.OK).json( listing );
});

export const updateListing = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById( id );
    
    if(!listing)
       throw new NotFoundError("Listing Not found");

    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    res.status(StatusCodes.OK).json(updateListing);
});

export const deleteListing = asyncHandler(async(req, res, next) => {
  try{  
  const { id } = req.params;
    const listing = await Listing.findById( id );

    if(!listing)
       throw new NotFoundError("Listing Not found");

    const deleted = await Listing.findByIdAndDelete(id) ;
    res.status(StatusCodes.OK).json({message: "Listing was deleted successfully"});
  }catch(error){
    next();
  }
})