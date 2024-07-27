import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import ForgotPassword from "../pages/ForgotPassword.js";
import Signup from "../pages/Signup.js";
import AdminPannel from "../pages/AdminPannel.js";
import AllUsers from "../pages/AllUsers.js";
import AllProducts from "../pages/AllProducts.js";
import CategoryProduct from "../pages/CategoryProduct.js";
import ProductDetails from "../pages/ProductDetails.js";
import Cart from "../pages/Cart.js";
import SearchProduct from "../pages/SearchProduct.js";
import Success from "../pages/Success.js";
import Cancel from "../pages/Cancel.js";
import OrderPage from "../pages/OrderPage.js";

const router=createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {
                path:"",
                element:<Home />
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"signup",
                element:<Signup/>
            },
            {
                path:"product-category",
                element:<CategoryProduct />
            },
            {
                path:"product/:id",
                element:<ProductDetails />
            },
            {
                path:"cart",
                element:<Cart />
            },
            {
                path:"success",
                element:<Success />
            },
            {
                path:"cancel",
                element:<Cancel />
            },
            {
                path:"search",
                element:<SearchProduct/>
            },
            {
                path:"order",
                element:<OrderPage />
            },
            {
                path:'admin-pannel',
                element:<AdminPannel/>,
                children:[
                    {
                        path:"all-user",
                        element:<AllUsers/>
                    },
                    {
                        path:"all-product",
                        element:<AllProducts/>
                    }

                ]
            },
           
        ]
    }
])

export default router