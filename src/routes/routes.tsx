import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/Home";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Order from "../screens/Order";
import PrivateRoutes from "./PrivateRoutes";
import DetailedProducts from "../screens/DetailedProducts";
import AddToCart from "../screens/AddToCart";
import Profile from "../screens/Profile";
import CreateProduct from "../screens/CreateProduct";

const router=createBrowserRouter([
    {
        path: "/",element:(<Home/>),
    },
    {
        path: "/signup",element:(<Signup/>),

    },
    {
        path: "/login",element:(<Login/>),

    },
    {
        path: "/order",element:( <PrivateRoutes>
            <Order/>
          </PrivateRoutes>),
    },
    {
        path: "/detailedofproducts",element:( <PrivateRoutes>
            <DetailedProducts/>
          </PrivateRoutes>),
    },
    {
        path: "/profile",element:( <PrivateRoutes>
            <Profile/>
          </PrivateRoutes>),
    },
    {
        path: "/cart",element:( <PrivateRoutes>
            <AddToCart/>
          </PrivateRoutes>),
    },
    
    {
        path: "/create-product",element:( <PrivateRoutes>
            <CreateProduct/>
          </PrivateRoutes>),
    },


    
])
export default router