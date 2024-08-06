const productModel = require("../../models/productModel")

const getProductDetails=async(req,res)=>{
    try {
        const {productId}=  req?.body

        const product = await productModel.findById(productId)

        res.json({
            message :"OK",
            data : product,
            success : true,
            error : false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error : true ,
            success : false
        })
    }
}

module.exports = getProductDetails