const mongoose = require("mongoose");


mongoose.connect(`mongodb+srv://udhaya:${process.env.password}@cluster0.ay7rvre.mongodb.net/${process.env.databasename}`)
