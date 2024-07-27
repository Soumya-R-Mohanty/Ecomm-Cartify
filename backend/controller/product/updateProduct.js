const uploadProductPermission = require('../../helpers/permission')
const productModel=require('../../models/productModel')
const updateProductController=async(req,res)=>{
    try {
        if(!uploadProductPermission(req.userId)){
            throw new Error("permission Denied")
        }

        const {_id,...resBody}=req.body

        const updateProduct=await productModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message:"Product update successfully",
            data:updateProduct,
            success:true,
            error:false
        })
    } catch (error) {
      res.status(400).json({
        message:error.message || error,
        error:true,
        success:false
      })  
    }
}

module.exports=updateProductController