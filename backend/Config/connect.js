import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log("DataBase is connected!")
    }catch(error) {
        console.error('not connected',error);
    }
}

export default connectDB
