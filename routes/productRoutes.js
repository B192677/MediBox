const express= require('express');
const { addProduct,getProduct, deleteProduct,updateProduct } = require('../controller/productController');
const auth = require("../middleware/AuthValidation")

const router=express.Router();
router.post('/addproduct', auth(["admin"]),addProduct);
router.get('/getproduct',getProduct)
router.put('/updateproduct/:id',auth(["admin"]),updateProduct)
router.delete('/deleteproduct/:id',auth(["admin"]),deleteProduct)

module.exports = router;