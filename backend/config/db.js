const mongoose=require('mongoose')

const connectDB=async()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Database Connected");
    }).catch((errr)=>{
        console.log(errr)
    })
}

module.exports=connectDB