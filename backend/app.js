import express  from "express";
import path from "path";
import connection from "./Config/connect.js";
import dotenv from "dotenv";
import userRouter from './routes/user.js';
import listingRouter from './routes/listings.js';
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.js'
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import  cors  from 'cors';



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, "frontend","dist","index.html"))
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start= async ()=>{
    try{
        //connect to DB
        await connection(process.env.MONGO_CONNECT);
        const server = app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`)
        })
    }catch(error){
        console.log(error);
    }
}

start();