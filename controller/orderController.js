const Order = require("../model/order");

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
  }
};

// Get orders of a specific user
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params; // make sure route has :userId param

    if (!userId) {
      return res.status(400).json({ message: "User ID is required in params" });
    }

    const orders = await Order.find({ user: userId });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Create order (no auth, userId from body)
exports.createOrder = async (req, res) => {
  try {
    const {  items, totalPrice, address } = req.body;

    // if (!userId) {
    //   return res.status(400).json({ message: "User ID is required" });
    // }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required and must be an array" });
    }

    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ message: "Total price must be greater than 0" });
    }

    if (
      !address ||
      !address.fullName ||
      !address.email ||
      !address.phone ||
      !address.shippingAddress
    ) {
      return res.status(400).json({ message: "Complete address information is required" });
    }

    const newOrder = new Order({
      // user: userId,
      items,
      totalPrice,
      address,
      status: "Pending",
    });

    await newOrder.save();

    return res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Cancel order by ID
exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required in params" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Order cannot be canceled at this stage" });
    }

    order.status = "Cancelled";
    await order.save();

    return res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    console.error("Error canceling order:", error);
    return res.status(500).json({ message: "Failed to cancel order", error: error.message });
  }
};

// Update order status (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required in params" });
    }

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid or missing status" });
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
};
