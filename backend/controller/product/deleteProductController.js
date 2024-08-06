const productModel = require("../../models/productModel");

const deleteProductController = async (req, res) => {
  try {
    const ProductId = req?.body;

    const deleteProduct = await productModel.deleteOne({
      _id: ProductId
    });

    res.json({
      data: deleteProduct,
      message: "Product Deleted From Admin",
      error: false,
      success: true
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

module.exports = deleteProductController;
