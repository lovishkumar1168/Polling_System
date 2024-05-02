import mongoose from "mongoose";

export const errorHandlerMiddleware = (err,req,res,next)=>{
    if(err instanceof mongoose.Error.ValidationError)
    {
        return res.status(400).send(err.message);
    }
    res.status(500).send("Oops! Something went wrong... Please try again later!");
}