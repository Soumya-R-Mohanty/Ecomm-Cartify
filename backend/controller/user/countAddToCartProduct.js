const addToCartmodel = require("../../models/cartProduct")

const countAddTocartProduct=async(req,res)=>{
    try {
    const userId=req.userId
    
    const count=await addToCartmodel.countDocuments({
        userId:userId
    })

    res.json({
        data:{
            count:count
        },
        message:"OK",
        error:false,
        success:true
    })
    } catch (error) {
        res.json({
            message:error.message ||error,
            error:true,
            success:false
        })
    }
}

module.exports=countAddTocartProduct