
const express=require("express");
const nodeserver=express()
const bodyparser=require("body-parser");
const appserver = require("./app");
const env=require("dotenv")
env.config()

nodeserver.use(bodyparser.json())
nodeserver.use(bodyparser.urlencoded({extended:true}))

 require("./db.config")

nodeserver.use("/api",appserver)


nodeserver.listen(process.env.PORT,"localhost",()=>{
    console.log("server started",process.env.PORT)
})