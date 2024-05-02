import { ObjectId } from "mongodb";
import { QuestionModel } from "../../question/model/question.schema.js";
import { OptionModel } from "./option.schema.js";

export class OptionRepository{
    
    /* for deleting an option */
    async delete(optionId)
    {
        try{

            /* find option document in the Option Collection */
            let option = await OptionModel.findById(optionId);
            if(!option)
            {
                return {success: false,msg: "option not found"}
            }

            /*check if option contain votes */
            if(option.votes)
            {
                return {success : false, msg : "you can't delete this option as it contains votes"}
            }

            /* deleting the option document */
            await OptionModel.deleteOne({_id : optionId});

            /* retierving question which contains that option which we are deleting and deleting that option from the question*/
            await QuestionModel.findOneAndUpdate(option.question,{$pull : {options : option._id}});
            return {success : true, msg : "option deleted successfully"};
        }
        catch(err)
        {
            console.log(err);
            throw err;
        }
    }

    /* for adding vote to an option */
    async add(optionId)
    {
        try{
            /* finding option document from the Option Collection */
            const option = await OptionModel.findById(optionId);
            if(!option)
            {
                return {success : false, msg : "option not found"};
            }
            
            /* increment the votes */
            option.votes++;
            await option.save();
            return {success : true, msg : "added vote successfully"};
        }
        catch(err)
        {
            console.log(err);
        }
    }
}