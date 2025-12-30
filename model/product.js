const mongoose=require('mongoose');
require("dotenv").config();
const productSchema=new mongoose.Schema({
    Categories:{type:String,required:true},
    DateofMfg:{type:Date,required:true},
    DateofExp:{type:Date,required:true},
    PriceInclTaxes:{type:Number,required:true},
    PharmaCompany:{type:String},
    Drugdetails:{type:String},
    title:{type:String,required:true},
})

exports.Products = mongoose.model("Products",productSchema);