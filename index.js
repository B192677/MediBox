const express=require("express");
const {Logger}=require("./middleware/Logger");
const cors = require("cors")
const AdminRoute =require("./routes/adminRoutes");
const ProductRoute=require("./routes/productRoutes");
const ProductUserRoute=require("./routes/ProductUserRoute");


const UserRoute=require("./routes/userRoutes");
const OrderRoute=require("./routes/orderRoutes")

require("dotenv").config();

const {connectDB}=require("./dbconnection")
const app=express();
const port=process.env.port || 3001;
app.use(express.json());
app.use(cors());


app.use(Logger);
app.use('/a',AdminRoute);
app.use('/p',ProductRoute);
app.use('/p',ProductUserRoute);
app.use('/u',UserRoute);
app.use('/o',OrderRoute);





connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

