import express from "express";
import { QuestionController } from "../controllers/question.controller.js";

export const questionRouter = express.Router();
const questionController = new QuestionController();


/* route for creating a question */
questionRouter.post("/create",(req,res,next)=>{
    questionController.createQuestion(req,res,next);
})

/* route for adding a option to a specific question */
questionRouter.post("/:id/options/create",(req,res,next)=>{
    questionController.addOptionToQuestion(req,res,next);
})

/* route for deleting a question*/
questionRouter.delete("/:id/delete",(req,res,next)=>{
    questionController.deleteQuestion(req,res,next);
})

/* route for retrieve a question */
questionRouter.get("/:id",(req,res,next)=>{
    questionController.getQuestion(req,res,next);
})