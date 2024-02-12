import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err,req,res,next)=>{
    let customError ={
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong try again later.',
    }
    
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
          .map((item) => item.message)
          .join(',')
        customError.statusCode = 400
      }
      if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
          err.keyValue
        )} field, please choose another value`
        customError.statusCode = 400
      }
      if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
      }
    res.status(customError.statusCode).json({ message: customError.message})
}