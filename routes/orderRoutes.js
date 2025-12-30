const express = require('express');
const {
  createOrder,
  getUserOrders,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  // getOrders // remove if not defined
} = require('../controller/orderController');

const router = express.Router();

router.post('/createorder', createOrder);
router.get('/getuserorders/:userId', getUserOrders); // <-- fixed route with :userId param
router.patch('/cancelorder/:id', cancelOrder);       // changed POST to PATCH
router.get('/getallorders', getAllOrders);
router.patch('/updateorderstatus/:id', updateOrderStatus); // changed POST to PATCH

// Remove if getOrders does not exist:
// router.get('/getorders', getOrders);

module.exports = router;
