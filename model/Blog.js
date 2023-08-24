const commentSchema = require("./comment");
const mongoose=require("mongoose")

const blogSchema = new mongoose.Schema({
"username": {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
"title":{type:String,require:true},
"content":{type:String,require:true},
"category": {type: String,enum:["Business","Tech", "Lifestyle","Entertainment"], default:"Business",require:true},
"date": {type: Date, default: Date.now},
likes:{type:Number,default:0},
comments:[commentSchema]
})

const Blog= mongoose.model("Blog",blogSchema);
module.exports=Blog ;