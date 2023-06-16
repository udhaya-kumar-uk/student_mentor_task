const mongoose = require("mongoose");

const mentorschema=new mongoose.Schema({

    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
       
      },
      skills: {
        type: Array,
        required: true,
      },
     
      contactnumber:{ 
        type:String
      }
    
})




module.exports=mongoose.model("mentor",mentorschema)