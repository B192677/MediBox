const express= require('express');
const {  registerUser,getUser, LoginByUser,ForgotPassword,ResetPassword, addToCart,getUserDetails,toggleWishlist, getwishlist } = require('../controller/userController');


const router=express.Router();

router.get('/', getUser);
router.post('/userDetails', getUserDetails);
router.post('/register',registerUser);
router.post('/login',LoginByUser);
router.post('/forgot',ForgotPassword);
router.post('/reset',ResetPassword);
router.post('/addtocart',addToCart);
//router.post('/getWishlist',getwishlist);

router.post('/toggleWishlist/:id',toggleWishlist);





module.exports = router;