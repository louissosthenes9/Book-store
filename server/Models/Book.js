import mongoose from "mongoose";

const bookSchema =mongoose.Schema(
    {


        _Id:{
            type:Number,
            required:true
        },

        title:{
            type:String,
            required:true
        },

        Description:{
            type:String,
            required:true
        },
        Author:{
            type:String,
            required:true
        },
        PublishYear:{
            type:Number,
            required:true
        },

        Price:{
            type:Number,
            required:true
        },

        Ratings:{
            type:Number,
            required:true
        },
       
    }
)

bookSchema.set('timestamps', true);
export const BooK = mongoose.model("Book",{
    _Id:Number,
    title:String,
    PublishYear:Number,
    Author:String,
    Ratings:Number,
    Price:Number,
    Description:String

})