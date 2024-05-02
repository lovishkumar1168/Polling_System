import { OptionModel } from "../../option/model/option.schema.js";
import { QuestionModel } from "./question.schema.js";

export class QuestionRepository{

    /* for creating question */
    async creatingQuestion(newQuestionData)
    {
        try{
            /* create a new document and store in the Question collection */
            const newQuestion = new QuestionModel(newQuestionData);
            const savedQuestion = await newQuestion.save();
            return savedQuestion;
        }
        catch(err)
        {
            console.log(err);
            throw err;
        }
    }
    
    /* for adding option to a specific question */
    async createOption(questionId,optionData)
    {
        try{

            /* finding question document in the Question collection */
            const question = await QuestionModel.findById(questionId);
            if(!question)
            {
                return {success : false, msg : "Question not found"};
            }
            

            /* create a new document and store in the option collection */
            const newOption = new OptionModel({...optionData,question : questionId});
            await newOption.save();


            /* adding link_to_vote field in the option document */
            const BASE_URL = "http://localhost:8000"
            newOption.link_to_vote = `${BASE_URL}/options/${newOption._id}/add_vote`;
            await newOption.save();


            /* adding option id in the options array of a specific question*/
            question.options.push(newOption._id);
            await question.save();


            /*populate the options array in the question document for showing updated question to user with newly added options */
            const populatedQuestion = await QuestionModel.findById(question._id).populate("options");
            return {success : true , msg : "Option Added to Question Successfully",Question : populatedQuestion};
        }
        catch(err)
        {
            console.log(err);
            throw err;
        }
    }
    
    /* for deleting question */
    async delete(questionId)
    {
        try{
            /* retireving question from Question Collection */
            const question = await QuestionModel.findById(questionId).populate("options");
            if(!question)
            {
                return {success: false,msg: "question not found"}
            }

            /* checking one of its options contain votes */
            for(let option of question.options)
            {
                if(option.votes)
                {
                    return {success: false,msg: "you can't delete this question as one of the options contain votes"}
                }
            }

            /* deleting question from Question Collection */
            await QuestionModel.deleteOne({_id : questionId});

            /* deleting options from Option Collection that are related to deleted Question*/
            await OptionModel.deleteMany({question : question._id});

            return {success: true,msg: "question deleted successfully"}
        }
        catch(err)
        {
            console.log(err);
            throw err;
        }
    }
    
    /* for retrieving question */
    async get(questionId)
    {
        try{
            /*populate the options array in the question document for showing question with options*/
            const question = await QuestionModel.findById(questionId).populate("options");
            if(!question)
            {
                return {success : false, msg : "Question not found"};
            }
            return {success : true ,Question : question};
        }
        catch(err)
        {
            console.log(err);
            throw err;
        }
    }
}