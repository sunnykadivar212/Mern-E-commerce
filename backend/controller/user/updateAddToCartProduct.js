const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const addToCartProductId = req?.body?._id;

    const qty = req?.body?.quantity;

    const updateProduct = await addToCartModel.updateOne(
      { _id: addToCartProductId },
      {
        ...(qty && { quantity: qty })
      }
    );
    console.log("update Product==>", updateProduct);
    res.json({
      message: "Product Updated",
      data: updateProduct,
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

module.exports = updateAddToCartProduct;
