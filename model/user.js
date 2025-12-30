const mongoose=require('mongoose');
require("dotenv").config();
const userSchema=new mongoose.Schema({
    
    name:{type:String,required:false},
    email:{type:String,required:false},
    password:{type:String,required:false},
     cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],

    gender:{type:String,required:true},
    mobile:{type:String,required:true},
   
})

exports.User = mongoose.model("User",userSchema);