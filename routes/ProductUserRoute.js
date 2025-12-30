const express= require('express');
const { addProductUser,getProductUsers,updateProductUser,deleteProductUser } = require('../controller/productUserController');

const router=express.Router();
router.post('/addProductUser', addProductUser);
router.get('/getproductUsers',getProductUsers);
router.post('/updateProductUser/',updateProductUser);
router.delete('/deleteProductUser/',deleteProductUser)

module.exports = router;