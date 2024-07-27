const addToCartmodel = require("../../models/cartProduct")

const updateAddTOcartProduct=async(req,res)=>{
    try {
        const currentUserId=req.userId
        const addTocartProductId=req?.body?._id

        const qty=req.body.quantity

        const updateProduct=await addToCartmodel.updateOne({_id : addTocartProductId},{
            ...(qty && {quantity:qty})
        })

        res.json({
            message:"Product Update",
            data:updateProduct,
            error:false,
            success:true
        })

    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

module.exports=updateAddTOcartProduct