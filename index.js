const express= require("express") ;
const mongoose= require("mongoose")
const cors= require("cors")
const config= require("./config")
const authRoutes= require("./routes/authRoutes")
const blogRoutes = require("./routes/blogRoutes")
 const commentRoutes = require("./routes/commentRoutes")

const app=  express() ;
app.use(express.json())
app.use(cors())



const PORT = process.env.PORT ||7979



mongoose.connect(config.mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Connected to Mongo Atlas")
}).catch(error=>{
    console.error(error)
})


app.use("/api",authRoutes);
app.use("/api",blogRoutes) ;
 app.use("/api",commentRoutes) ;

app.get("/",(req,res)=>{
    res.send("Welcome to the Blog App Database")
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})