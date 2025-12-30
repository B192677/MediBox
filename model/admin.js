const mongoose=require('mongoose');
require("dotenv").config();
const adminSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}
})


exports.Admin = mongoose.model("Admin",adminSchema);