const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const User= require("../model/User")
const config= require("../config")


//Signup

exports.register= async(req,res)=>{

const { username,avatar,email,password}= req.body ;

try{
const existingUser= await User.findOne({email});
if(existingUser){
    return res.status(401).json({error: "User already exists"}) ;
}

const hashedPassword= await bcrypt.hash(password,10);

const newUser= new User({username,avatar,email,password: hashedPassword});
await newUser.save();

 res.status(201).json({message: "Signup Successfull"}) ;

}
catch(error){
console.error("Error registering",error);
res.status(500).json({error: "Server Error"}) ;
}
};

//Login

exports.login = async(req,res)=>{

    const {email,password}= req.body ;
    
    try{
    const user= await User.findOne({email});
    if(!user){
        return res.status(401).json({error: "Invalid Credentials"}) ;
    }
    

    const isMatch= await bcrypt.compare(password,user.password)
    const hashedPassword= await bcrypt.hash(password,10);
    
    if(!isMatch){
        return res.status(401).json({error: "Invalid Credentials"}) ;
    }
   
    const token=jwt.sign({userId:user._id},config.JWT_SECRET,{expiresIn: "1h"})
      

     res.status(200).json({message: "Login Successfull",token}) ;
    
    }
    catch(error){
       
    console.error("Error logging in",error);
    res.status(500).json({error: "Server Error"}) ;
    }
    };