const productModel = require("../../models/productModel")

const getCategoryWiseProduct=async(req,res)=>{
    try {
        const {category}= req?.body || req?.query
        const response = await productModel.find({category})

        res.json({
            message : "All Product Category wise",
            data : response,
            success : true,
            error :false
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports= getCategoryWiseProduct