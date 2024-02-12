import mongoose from "mongoose";


const connection = async (uri) => {
    try{
        await mongoose.connect(uri);
        console.log("DataBase is connected!")
    }catch(error) {
        console.error('not connected',error);
    }
}

export default connection
