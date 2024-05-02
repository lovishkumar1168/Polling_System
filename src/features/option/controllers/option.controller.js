import { OptionRepository } from "../model/option.repository.js";

export class OptionController{
    constructor()
    {
        this.optionRepository =  new OptionRepository();
    }
    /* for deleting an option */
    async deleteOption(req,res,next)
    {
        try{
            const optionId = req.params.id;
            const response = await this.optionRepository.delete(optionId);
            if(!response.success)
            {
                return res.status(400).send(response);
            }
            return res.status(200).send(response);
        }
        catch(err)
        {
            next(err);
        }
    }

    /* for adding vote to an option */
    async addVote(req,res,next)
    {
        try{
            const optionId = req.params.id;
            const response = await this.optionRepository.add(optionId);
            if(!response.success)
            {
                return res.status(400).send(response);
            }
            return res.status(201).send(response);
        }
        catch(err)
        {

        }
    }
}