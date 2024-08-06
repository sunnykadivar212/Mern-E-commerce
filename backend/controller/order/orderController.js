const orderModel = require("../../models/orderPaymentModel");

const orderController = async (req, res) => {
  try {
    const currentuserId = req?.userId;

    const orderList = await orderModel
      .find({ userId: currentuserId })
      .sort({ createdAt: -1 });

    res.json({
      data: orderList,
      message: " orderList",
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true
    });
  }
};

module.exports = orderController;
