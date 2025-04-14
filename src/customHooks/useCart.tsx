import { useEffect, useState } from "react";

type ProductImage = {
  data: string;
  contentType: string;
  _id?: string;
};

type ProductType = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: ProductImage[];
  uploaderId?: string;
  _id: string;
};

// Correctly define the state as an array of CartObjectType
const useCart = () => {
  const [cart, setCart] = useState<ProductType[]>(
    ()=>{
        const savedCart=localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) :[]
    }
  );
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (CartObject: ProductType) => {
    setCart((prevVal) => {
      // Check if the product already exists in the cart
      const existingItem = prevVal.find((item) => item._id === CartObject._id);

      if (existingItem) {
        return prevVal; // Return unchanged if already exists
      } else {
        return [...prevVal, CartObject]; // Add new item
      }
    });
  };

 

  return { addToCart, cart, setCart };
};

export default useCart;
