const addToCartmodel = require("../../models/cartProduct")

const addToCartController=async(req,res)=>{
    try {
        const {productId}=req?.body
        const currentUser=req.userId

        const isProductAvialable=await addToCartmodel.findOne({ productId, userId:currentUser })

        if(isProductAvialable){
            return res.json({
                message:"Already Exist in the Add To cart",
                success:false,
                error:true
            })
        }

        const payload={
            productId:productId,
            quantity:1,
            userId:currentUser
        }

        const newAddToCart=new addToCartmodel(payload)
        const saveProduct=await newAddToCart.save()

        return res.json({
            data:saveProduct,
            message:"Product Added in Cart",
            success:true,
            error:false
        })

    } catch (error) {
        res.json({
            message:error?.message || error,
            error:true,        
            success:false
        })
    }
}

module.exports=addToCartController