import CustomAPIError from "./cutom-error.js";
import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends CustomAPIError{
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.UNAUTHORIZED
    }
}

export default UnauthenticatedError