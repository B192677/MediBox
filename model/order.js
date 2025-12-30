const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: String, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      subTotal :Number,
    },
  ],
  totalPrice: { type: Number, required: true },
  address: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
  },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
