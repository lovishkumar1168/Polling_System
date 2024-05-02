import express from "express";
import { connectToMongoDBUsingMongoose } from "./src/config/mongooseConfig.js";
import { questionRouter } from "./src/features/question/routes/question.routes.js";
import { optionRouter } from "./src/features/option/routes/option.routes.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.middleware.js";
import bodyParser from "body-parser";


const server = express();
server.use(bodyParser.json());


server.use("/questions",questionRouter);
server.use("/options",optionRouter);

server.use(errorHandlerMiddleware);

server.listen(8000,()=>{
    console.log("server is listening at 8000");
    connectToMongoDBUsingMongoose();
})