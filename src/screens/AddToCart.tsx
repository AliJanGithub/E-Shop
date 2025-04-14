import React, { useEffect, useState } from "react";


type ProductImage = {
  data: string;
  contentType: string;
  _id?: string;
};

type CartObjectType = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: ProductImage[];
  uploaderId?: string;
  _id: string;
  quantity?: number; // Allow users to update quantity
};

export default function AddToCart({ onClose }: { onClose?: () => void }) {
    const [cartElements, setCartSavedElements] = useState<CartObjectType[]>([]);
  console.log(onClose)
    useEffect(() => {
      const savedCarts = localStorage.getItem("cart");
      const cartItems = savedCarts ? JSON.parse(savedCarts) : [];
      setCartSavedElements(cartItems);
    }, []);
  
    const updateQuantity = (index: number, newQuantity: number) => {
      const updatedCart = [...cartElements];
      updatedCart[index].quantity = newQuantity;
      setCartSavedElements(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
  
    return (
      <div>
        {cartElements.length > 0 ? (
          <div className="space-y-4">
            {cartElements.map((ele, ind) => (
              <div key={ind} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow">
                <img
                  src={`data:${ele.images[0].contentType};base64,${ele.images[0].data}`}
                  alt={ele.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{ele.name}</h3>
                  <p className="text-gray-600">${ele.price}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(ind, Math.max(1, (ele.quantity || 1) - 1))}
                    className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg">{ele.quantity || 1}</span>
                  <button
                    onClick={() => updateQuantity(ind, (ele.quantity || 1) + 1)}
                    className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No items in cart.</p>
        )}
      </div>
    );
  }
  