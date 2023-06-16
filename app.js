const express=require("express")
const studentRouter = require("./controllers/student.controllers")
const mentorRouter = require("./controllers/mentor.controller")
const appserver=express()


// appserver.get("/",(req,res,next)=>{
//     return res.status(200).json({
//         message:"appserver started "
//     })
// })
appserver.use("/students",studentRouter)
appserver.use("/mentor",mentorRouter)

module.exports=appserver