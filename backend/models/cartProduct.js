const mongoose=require('mongoose')

const addToCartSchema=mongoose.Schema({
    productId:{
        ref:'product',
        type:String
    },
    quantity:Number,
    userId:String
},{
    timestamps:true
})

const addToCartmodel=mongoose.model("addToCart",addToCartSchema)

module.exports=addToCartmodel