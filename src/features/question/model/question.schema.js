import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Question title is required"]
    },
    options : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Option",
        required : true
    }]
})

export const QuestionModel = mongoose.model("Question",questionSchema);