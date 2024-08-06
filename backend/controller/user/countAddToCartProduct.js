const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req?.userId;

    const count = await addToCartModel.countDocuments({
      userId: userId
    });

    res.json({
      data: {
        count: count
      },
      message: "OK",
      success: true,
      error: false
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

module.exports = countAddToCartProduct;
