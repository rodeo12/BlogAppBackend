const Blog= require("../model/Blog")
const Comment=require("../model/comment")
// const User= require("../model/User")



exports.addComments = async(req,res)=>{

    try{
        const {content}= req.body
        const user= req.user._id;
        const newComment= new Comment({user,content})
        const savedComment= await new Comment.save();

        const blogId= req.params.id;
        const blog= await Blog.findByIdAndUpdate(blogId,{$push: {comments: savedComment._id}},{new:true});
   
        res.status(201).json({message:"Comment added Successfully"});
     
    }catch(error){
        console.error("error adding commnets",error);
        res.status(500).json({error:"error occurred"});
    }
    }
    module.exports= exports;