import mongoose from "mongoose";

export const connectToMongoDBUsingMongoose = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/PollingSystem",{useNewUrlParser : true, useUnifiedTopology : true});
        console.log("connected to database using mongoose");
    }
    catch(err)
    {
        console.log(err);
    }
}