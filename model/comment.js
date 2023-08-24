const mongoose= require("mongoose");

const commentSchema= new mongoose.Schema({
user:{type:mongoose.Schema.Types.ObjectId,ref: "User", required: true},
content:{type: String,required:true},
date: {type: Date, default: Date.now},

})


module.exports=commentSchema;