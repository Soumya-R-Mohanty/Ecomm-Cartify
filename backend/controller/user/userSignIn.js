const bcryptjs=require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt=require('jsonwebtoken')

const userSignInController=async(req,res)=>{
    try {
        const {email,password}=req.body

        if(!email){
            throw new Error("Please Provide Email")
        }

        if(!password){
            throw new Error("Please Provide Password")
        }

        const user=await userModel.findOne({email})

        if(!user){
            throw new Error("User Not Found")
        }

        const checkPassword=await bcryptjs.compare(password,user.password)
        console.log(checkPassword);

        if(checkPassword){
            const tokenData={
                _id:user.id,
                email:user.email
            }

            const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn:60*60*8})

            const tokenOption={
                httpOnly:true,
                secure:true
            }

            res.cookie("token",token,tokenOption).status(200).json({
                message:"login Sucessfully",
                data:token,
                success:true,
                error:false
            })
        }else{
            throw new Error("Please Check Password")
        }


        
    } catch (error) {
        res.json({
            message:error.message ||error,
            error:true,
            success:false
        })
    }
}

module.exports=userSignInController