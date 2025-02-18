const orderModel = require("../../models/orderProductModel")

const orderController=async(req,res)=>{
    try {
        const currentUserId=req.userId

        const orderList=await orderModel.find({userId:currentUserId}).sort({createdAt:-1})

        res.json({
            data:orderList,
            message:'Order List',
            success:true,
            error:false
        })
    } catch (error) {
        res.status(500).json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}

module.exports=orderController