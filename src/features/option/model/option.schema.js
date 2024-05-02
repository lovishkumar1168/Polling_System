import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    text : {
        type : String,
        required : [true,"option text is required"]
    },
    votes : {
        type : Number,
        default : 0
    },
    link_to_vote : {
        type : String
    },
    question : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Question"
    }
})

export const OptionModel = mongoose.model("Option",optionSchema);