const mongoose=require('mongoose');
require("dotenv").config();
const productUserSchema=new mongoose.Schema({
    user:{type:String,required:false},
    productId:{type:String,required:false},
    Active:{type:String,required:false}
})

exports.ProductUser = mongoose.model("ProductUser",productUserSchema);