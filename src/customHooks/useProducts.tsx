import {  useState } from 'react';
import {Url} from '../../contant'


// type ProductImage = {
//       data: string;
//       contentType: string;
//       _id?: string; // Optional if the backend provides an _id
//     };
    
//     type ProductType = {
//       name: string;
//       description: string;
//       price: number;
//       category: string;
//       stock: number;
//       images: ProductImage[]; // Change from string[] to ProductImage[]
//       uploaderId?: string;
//     };
//     type UserType = {
//       success:boolean
//       token: string;
//        // in case you have other properties like name, email etc.
//     };
    type ProductOrderPayload = {
      productId: string;
      quantity: number;
    };
const useProducts=()=>{
    const [products, setProducts]=useState([]);
   const getProducts= async()=>{
         const response=await fetch(`${Url}/product/products`)
         const data=await response.json()
         setProducts(data.products)
         console.log(products,data)


   }
  
  
    
    const placeOrder = async (products: ProductOrderPayload[]) => {
      const rawUser = localStorage.getItem("user");
      const user = rawUser ? JSON.parse(rawUser) : null;
      const token = user?.token;
    
      try {
        const response = await fetch(`${Url}/order/createorder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ products }),
        });
    
        const data = await response.json();
        console.log("Order Response:", data);
    
        if (data.success) {
          alert("🛒 Order placed successfully!");
        } else {
          alert("❌ Order failed: " + data.message);
        }
      } catch (error) {
        console.error("Order error:", error);
        alert("❌ Error placing order.");
      }
    };
           
   


   return {getProducts,products,placeOrder}

}
export default useProducts