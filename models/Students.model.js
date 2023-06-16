const mongoose = require("mongoose");

const studentschema=new mongoose.Schema({

    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      course: {
        type: String,
        required: true,
      },
      contactnumber: {
        type: String,
        required: true,
      },
      mentorAssigned: {
        type: mongoose.Schema.ObjectId,
       
      },
})

module.exports=mongoose.model("student",studentschema)