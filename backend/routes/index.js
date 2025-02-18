const express=require('express')
const router=express.Router()
const userSignUpController=require("../controller/user/userSignUp")
const userSignInController=require("../controller/user/userSignIn")
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const uploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct=require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddTocartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddTOcartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchproduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhook')
const orderController = require('../controller/order/order.controller')



router.post('/signup',userSignUpController)
router.post('/signin',userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)


// admin pannel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

// product
router.post("/upload-product",authToken,uploadProductController)
router.get('/get-product',getProductController)
router.post('/update-product',authToken,updateProductController)
router.get('/get-categoryProduct',getCategoryProduct)
router.post('/category-product',getCategoryWiseProduct)
router.post('/product-details',getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

// user Add To Cart
router.post('/addtocart',authToken,addToCartController)
router.get('/countAddTocartProduct',authToken,countAddTocartProduct)
router.get('/view-cart-Product',authToken,addToCartViewProduct)
router.post('/update-cart-product',authToken,updateAddTOcartProduct)
router.post('/delete-cart-product',authToken,deleteAddToCartProduct)


// payment order
router.post('/checkout',authToken,paymentController)
router.post('/webhook',webhooks) //  /api/webhook
router.get('/order-list',authToken,orderController)



module.exports=router