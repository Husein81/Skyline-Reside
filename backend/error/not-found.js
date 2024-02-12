import CustomAPIError from "./cutom-error.js";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomAPIError{
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.NOT_FOUND
    }
}

export default NotFoundError
