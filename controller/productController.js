const { Products } = require("../model/product");

// ✅ ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    console.log("addProduct payload:", req.body);

    const {
      Categories,
      DateofMfg,
      DateofExp,
      PriceInclTaxes,
      PharmaCompany,
      Drugdetails,
      title,
    } = req.body;

    // Validation
    if (!title || PriceInclTaxes === undefined) {
      return res.status(400).json({ message: "Title and PriceInclTaxes are required" });
    }

    const newProduct = new Products({
      Categories,
      DateofMfg,
      DateofExp,
      PriceInclTaxes: Number(PriceInclTaxes), // Convert to number
      PharmaCompany,
      Drugdetails,
      title,
    });

    const saved = await newProduct.save();

    res.status(201).json(saved); // Return the saved product directly for frontend
  } catch (error) {
    console.error("Error adding product:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message, errors: error.errors });
    }
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

// GET ALL PRODUCTS
exports.getProduct = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products); // Simplified - just return products array
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      message: "Error getting products",
      error: err.message,
    });
  }
};

// UPDATE PRODUCT - Your existing code is perfect, just small improvement
exports.updateProduct = async (req, res) => {
  try {
    console.log("updateProduct payload:", req.body);
    console.log("Product ID:", req.params.id);

    // Convert PriceInclTaxes to number if it exists
    if (req.body.PriceInclTaxes !== undefined) {
      req.body.PriceInclTaxes = Number(req.body.PriceInclTaxes);
    }

    // Your existing date parsing logic is good
    const parseDateDDMMYYYY = (dateStr) => {
      const [day, month, year] = dateStr.split("-");
      if (!day || !month || !year) return null;
      return new Date(`${year}-${month}-${day}`);
    };

    if (req.body.DateofMfg) {
      const parsedDate = parseDateDDMMYYYY(req.body.DateofMfg);
      if (!parsedDate || isNaN(parsedDate)) {
        return res.status(400).json({ message: "Invalid DateofMfg format" });
      }
      req.body.DateofMfg = parsedDate;
    }

    if (req.body.DateofExp) {
      const parsedDate = parseDateDDMMYYYY(req.body.DateofExp);
      if (!parsedDate || isNaN(parsedDate)) {
        return res.status(400).json({ message: "Invalid DateofExp format" });
      }
      req.body.DateofExp = parsedDate;
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct); // Return the updated product directly
  } catch (error) {
    console.error("Error updating product:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.error("Delete error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};