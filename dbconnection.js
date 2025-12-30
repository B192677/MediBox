const {connect} = require('mongoose');
require("dotenv").config();

const connectDB= async ()=>{
    await connect(`${process.env.DB_URI}${process.env.DB_NAME}`)
    console.log(`DB connected....`)


}


module.exports={connectDB}