const mentorRouter=require("express").Router();
const mentormodel=require("../models/Mentor.model");
const { findById } = require("../models/Students.model");

mentorRouter.get("/",async(req,res,next)=>{
    const{}=await req.body
    mentormodel.find({

    })
    .then(response=>{
      if(response){
         return res.status(200).json({
              success:true,
              message: "done",
            response
            });
      }else{
         return res.status(500).json({
               success:false,
              message: "error",
              response
  
  
            });
      }
     })
    .catch((error)=>{
      res.status(400).json({
          success:false,
          message: "bad request",
          error:error
        });
    })
    
})




mentorRouter.post("/creatementor",function (req,res,next){
    console.log(req.body)
    const{
        name,
        email,
       skills,
       contactnumber
    }=req.body
 
     const newmentor=new mentormodel( 
        {
            name,
            email,
           skills,
           contactnumber
        });
        newmentor.save().then((response)=>{
            if(response._id){
              return res.status(200).json({
                success:true,
                message:"mentor created successfully",
                response
              })
            }else{
                return res.status(500).json({
                    success:false,
                    message:"error creating mentor",
                    response
                  })
            }
        }).catch((error )=>{
            return res.status(400).json({
                success:false,
                message:"Bad Request",
                error:error
              })
        })

})



mentorRouter.patch("/updatementor",function (req,res,next){
  console.log(req.body)
  const{
      mentorId,
      name,
      email,
      skills,
      contactnumber
  }=req.body

   mentormodel.updateOne({_id:mentorId},{
      
          $set:{
            name,
            email,
            skills,
            contactnumber
          }
   }
      ).then((response)=>{
          if(response){
            return res.status(200).json({
              success:true,
              message:"mentor update successfully",
              response
            })
          }else{
              return res.status(500).json({
                  success:false,
                  message:"error updated mentor",
                  response
                })
          }
      }).catch((error )=>{
          return res.status(400).json({
              success:false,
              message:"Bad Request",
              error:error
            })
      })

})

//search by mentor name

mentorRouter.get("/search/:name",async(req,res)=>{
  console.log(req.params.name)
  let data=await mentormodel.find(
    {
      "$or":[
        {"name":{$regex:req.params.name}}
      ]
    }
  )
  res.send(data)
})
     
mentorRouter.get("/get/:studentsAssigned",async(req,res)=>{

  let data=await mentormodel.findOne(
    {
      "$or":[
        {"studentsAssigned":{$regex:req.params.studentsAssigned}}
      ] 
    }
  )
  res.send(data)
})
  






// mentorRouter.get("/:id", (req, res) => {
//     try {
//         const ment =  mentormodel
//           .findById(req.params.id)
//           .populate("studentsAssigned", "name");
//         res.send(ment);
//       } catch (e) {
//         console.log(e, "error");
//         res.status(500).json({
//           message:"error in for 1 mentor get all students"
//         });
//       }
//     })



    
//     try {
//       const ment =  mentormodel
//         .findById(req.params.id)
//         .populate("studentsAssigned", "name");
//       res.send(ment);
//     } catch (e) {
//       console.log(e, "error");
//       res.status(500).send("error in for 1 mentor get all students");
//     }
  


module.exports=mentorRouter