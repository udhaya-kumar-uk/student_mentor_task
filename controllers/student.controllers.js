const studentRouter=require("express").Router();
const studentmodel=require("../models/Students.model");

studentRouter.get("/",async(req,res,next)=>{
    const{}=await req.body
    studentmodel.find({
      
    }).then(response=>{
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



studentRouter.get("/all",async(req,res,next)=>{
  const{}=await req.body
  studentmodel.aggregate([
   {
    $project:{
    _id:0,
    name:1,
    email:1,
    course:1,
    contactnumber:1,
    mentorAssigned:1
    }
   } ,
   {
    $lookup:{
      from:"mentors",
      localField:"mentorAssigned",
      foreignField:"_id",
      as:"mentor assigned to student",
    }
   },
   {
    $sort:{
      name:1
    }
   }
  ]).then(response=>{ 
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


studentRouter.post("/createstudent",function (req,res,next){
   
    const{
        name,
        email,
        course,
        contactnumber,
        mentorAssigned
    }=req.body
 
     const newstudent=new studentmodel( 
        {
            name,
            email,
            course,
            contactnumber,
            mentorAssigned 
        });
        newstudent.save().then((response)=>{
            if(response._id){
              return res.status(200).json({
                success:true,
                message:"student created successfully",
                response
              })
            }else{
                return res.status(500).json({
                    success:false,
                    message:"error creating student",
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


studentRouter.patch("/updatestudent",function (req,res,next){
    console.log(req.body)
    const{
        studentId,
        name,
        email,
        course,
        contactnumber,
        mentorAssigned
    }=req.body
 
     studentmodel.updateOne({_id:studentId},{
        
            $set:{
                name,
                email,
                course,
                contactnumber,
                mentorAssigned   
            }
     }
        ).then((response)=>{
            if(response){
              return res.status(200).json({
                success:true,
                message:"student update successfully",
                response
              })
            }else{
                return res.status(500).json({
                    success:false,
                    message:"error updated student",
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

studentRouter.get("/search/:name",async(req,res)=>{
  console.log(req.params.name)
  let data=await studentmodel.find(
    {
      "$or":[
        {"name":{$regex:req.params.name}}
      ]
    }
  )
  res.send(data)
})




module.exports=studentRouter

