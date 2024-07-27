const userModel=require('../../models/userModel') 

const allUsers =async(req,res)=>{
    try {
        console.log("userId",req.userId);

        const allUsers=await userModel.find()

        res.json({
            message:"All User",
            data:allUsers,
            error:false,
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}

module.exports=allUsers