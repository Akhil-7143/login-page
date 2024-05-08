const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/authentication")
.then(res => {
  console.log(`MongoDB connected.`);
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
});


// create schema

const newSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
})

const userData=mongoose.model("users",newSchema)

module.exports = userData;
