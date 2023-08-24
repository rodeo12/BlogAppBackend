const express= require("express")
const router= express.Router();
const authenticateJWT= require("../utils/auth")
const blogController= require("../controllers/blogController");

// router.use(authenticateJWT);

router.get("/blogs",blogController.getAllBlogs);
router.get("/blogs?title=”Present”",blogController.searchBlogsByTitle);
router.get("/blogs?category=tech",blogController.getBlogsByCategory);
router.get("/blogs?sort=date&order=asc",blogController.getSortedBlogs);
router.post("/blogs",blogController.createBlog);
router.put("/blogs/:id",blogController.updateBlog);
router.delete("/blogs/:id",blogController.deleteBlog);
router.put("/blogs/:id/like",blogController.likeBlog);


module.exports=router ;
