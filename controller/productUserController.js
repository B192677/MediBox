const { ProductUser } = require("../model/productUser");

  

//  ADD PRODUCTUser Wishlisted
exports.addProductUser = async (req, res) => {
  try {
    console.log("addProductUser payload:", req.body);

    const {
        user,
        productId,
        Active,
    } = req.body;


    // Validation
    // if (!title || PriceInclTaxes === undefined) {
    //   return res.status(400).json({ message: "Title and PriceInclTaxes are required" });
    // }

    const newProductUser = new ProductUser({
        user,
        productId,
        Active,
    });

    const saved = await newProductUser.save();

    res.status(201).json({
      message: "ProductUser added successfully",
      newProduct: saved,
    });
  } catch (error) {
    console.error("Error adding productUser:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message, errors: error.errors });
    }
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};


//  GET ALL PRODUCTUSERS

exports.getProductUsers = async (req, res) => {
  try {
     const { user } = req.query;

     const getProductUsers = new ProductUser({
        user,
        productId: "",
        Active: "",
        });

    // Build dynamic filter object
    const filter = {};
    if (user) filter.user = user;
    //if (productId) filter.productId = productId;

    const productUsers = await ProductUser.find(filter);

    res.status(200).json(
      productUsers.map((p) => ({
        ...p.toObject(),
        _id: p._id.toString(),
      }))
    );
  } catch (err) {
    console.error("Error fetching productUsers:", err);
    res.status(500).json({
      message: "Error getting productUsers",
      error: err.message,
    });
  }
};

// UPDATE PRODUCT USER
exports.updateProductUser = async (req, res) => {
  try {
    const { user, productId, Active } = req.body;
    console.log("Updating ProductUser with:", { user, productId });
    const result = await ProductUser.findOneAndUpdate(
      { user, productId },       // Filter 
      { $set: {Active} },       // Update
      { new: true }               // Return updated document
    );
    console.log('log');
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }

};


//  DELETE PRODUCT
exports.deleteProductUser = async (req, res) => {
  try {
   const { user, productId } = req.body;

    const deletedProduct = await ProductUser.findOneAndDelete({ user, productId },{ new: true } );

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};




















