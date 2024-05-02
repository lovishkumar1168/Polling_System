import { QuestionRepository } from "../model/question.repository.js"

export class QuestionController{
    constructor()
    {
        this.questionRepository = new QuestionRepository();
    }

    /* for creating question */
    async createQuestion(req,res,next)
    {
        try{
            const newQuestion = await this.questionRepository.creatingQuestion(req.body);
            return res.status(201).json({success: true, msg : "Question created successfully", addedQuestion : newQuestion});
        }
        catch(err)
        {
            console.log(err);
            next(err);
        }
    }

    /* for adding option to a specific question */
    async addOptionToQuestion(req,res,next)
    {
        try{
            const questionId = req.params.id;
            const response = await this.questionRepository.createOption(questionId,req.body);
            if(!response.success)
            {
                return res.status(400).send(response);
            }
            return res.status(201).send(response);
        }
        catch(err)
        {
            console.log(err);
            next(err);
        }
    }

    /* for deleting question */
    async deleteQuestion(req,res,next)
    {
        try{
            const questionId = req.params.id;
            const response = await this.questionRepository.delete(questionId);
            if(!response.success)
            {
                return res.status(400).send(response);
            }
            return res.status(200).send(response);
        }
        catch(err)
        {
            console.log(err);
            next(err);
        }
    }

    /* for retrieving question */
    async getQuestion(req,res,next)
    {
        try{
            const questionId = req.params.id;
            const response = await this.questionRepository.get(questionId);
            if(!response.success)
            {
                return res.status(400).send(response);
            }
            return res.status(200).send(response); 
        }
        catch(err)
        {
            console.log(err);
            next(err);
        }
    }
}