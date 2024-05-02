import express from "express";
import { OptionController } from "../controllers/option.controller.js";

export const optionRouter = express.Router();
const optionController = new OptionController();


/* route for deleting an option */
optionRouter.delete("/:id/delete",(req,res,next)=>{
    optionController.deleteOption(req,res,next);
});

/* route for adding a vote to an option of question*/
optionRouter.post("/:id/add_vote",(req,res,next)=>{
    optionController.addVote(req,res,next);
});