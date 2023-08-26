const express= require("express")
const router= express.Router();
const authenticateJWT= require("../utils/auth")
const commentController= require("../controllers/commentController");

// router.use(authenticateJWT);

router.put("/blogs/:id/comment",commentController.addComments);


module.exports=router ;