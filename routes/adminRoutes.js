const express= require('express');
const { getAdmin,getRegisterByAdmin,LoginByAdmin} = require('../controller/adminController');





const router=express.Router();
router.get('/',getAdmin);
router.post('/register',getRegisterByAdmin);
router.post('/login',LoginByAdmin)

module.exports = router;