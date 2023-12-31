const Blog= require("../model/Blog")

exports.getAllBlogs = async(req,res)=>{

try{
    const blogs= await Blog.find({user:req.user})
    .populate("user","username")
    .sort({date:-1});
    res.json(blogs)
}catch(error){
    console.error("error fetching blogs",error);
    res.status(500).json({error:"error occurres"});
}
}

exports.searchBlogsByTitle = async(req,res)=>{

    try{
        const titleQuery= req.params.query;
        // console.log(titleQuery)
        const blogs= await Blog.find({
            user:req.user,
            title:{$regex:titleQuery,$options:"i"}
        })
        .populate("user","username")
        .sort({date:-1});
        res.json(blogs)      
        
    }catch(error){
        console.error("error fetching blogs",error);
        res.status(500).json({error:"error occurred"});
    }
    }


    exports.getBlogsByCategory = async(req,res)=>{

        try{
            const categoryQuery= req.params.query;
            // console.log(categoryQuery)
            const blogs= await Blog.find({
                user:req.user,
                category: categoryQuery
                 
            })
            
            .populate("user","username")
            .sort({date:-1});
            res.json(blogs)      
            
        }catch(error){
            console.error("error fetching blogs",error);
            res.status(500).json({error:"error occurres"});
        }
        }



        exports.getSortedBlogs = async(req,res)=>{

            try{ 
                const date = req.params.date;
                const order= req.query.order;
                const blogs= await Blog.find({user:req.user})
                .populate("user","username")
                .sort({date:order});
                res.json(blogs)      
                
            }catch(error){
                console.error("error fetching blogs",error);
                res.status(500).json({error:"error occurres"});
            }
            }
    
// Create Blog
            exports.createBlog = async(req,res)=>{

                try{
                    const {title,content,category}= req.body ;
                    const user= req.user;
                    // console.log(user)
                    const newblog= new Blog ({user,title,content,category});
                    const savedBlog= await newblog.save();
                    res.status(201).json(savedBlog);
                    
                }catch(error){
                    console.error("error creating blogs",error);
                    res.send(error)
                    // res.status(500).json({error:"error occurred"});
                }
                }
        
// Update Blog
                exports.updateBlog = async(req,res)=>{

                    try{
                        const blogId= req.params.id;
                        const {title,content,category}= req.body ;
                        const user= req.user._id;
                        const blog= await Blog.findOne({_id:blogId,user});
                      if(!blog){
                        return res.status(404).json({error:"Blog not found"});
                      }
                        blog.title= title;
                        blog.content= content;
                        blog.category= category;
                        const updatedBlog= await blog.save();
                        res.json(updatedBlog);       
                    }catch(error){
                        console.error("error creating blogs",error);
                        res.status(500).json({error:"error occurred"});
                    }
                    }

                    exports.deleteBlog = async(req,res)=>{

                        try{
                            const blogId= req.params.id;
                            const user= req.user._id;
                            const blog= await Blog.findOne({_id:blogId,user});
                          if(!blog){
                            return res.status(404).json({error:"Blog not found"});
                          }
                            await blog.remove();
                            res.json({message: "Blog deleted successfully"})      
                        }catch(error){
                            console.error("error creating blogs",error);
                            res.status(500).json({error:"error occurred"});
                        }
                        }

   ///Like BLog                     

                        exports.likeBlog = async(req,res)=>{

                            try{
                                const blogId= req.params.id; 
                                console.log(blogId) 
                                // const user= req.user._id;
                           
                                const blog = await Blog.findByIdAndUpdate(
                                    blogId,
                                    { $inc: { likes: 1 } },
                                    { new: true }
                                  );
                             console.log(blog) 
                              if(!blog){
                                return res.status(404).json({error:"Blog not found"});
                              }
                            //   if(blog.likes.includes(user)){
                            //     return res.status(400).json({error:"You already liked this blog"});
                            //   }    
                            //   blog.likes.push(user)
                            await blog.save();
                            return res.status(404).json({error:"Blog liked"});
                              
                            }catch(error){
                                console.error("error creating blogs",error);
                                res.status(500).json({error:"error occurred"});
                            }
                            }
            

                    
   
                    
        

module.exports= exports;