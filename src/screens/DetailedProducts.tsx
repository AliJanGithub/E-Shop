import { useEffect, useState } from "react";
import useUser from "../context/newUser";
import { Link, useLocation } from "react-router-dom";
import AddToCart from "./AddToCart";
import useCart from "../customHooks/useCart";
import useProducts from "../customHooks/useProducts";

type ProductImage = {
  data: string;
  contentType: string;
  _id?: string;
};
type CartObjectType = {
  _id: string;
  quantity: number;
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

const DetailedProducts = () => {
  const { singleProduct } = useUser();
  const { addToCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [privateCheck, setprivateCheck] = useState<boolean>(false);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const location = useLocation();
  const { placeOrder } = useProducts();
  const [product] = useState<ProductType>(
    singleProduct || location.state?.prod || ({} as ProductType)
  );

  useEffect(() => {
    const rawuser = localStorage.getItem("user");
    const user = rawuser ? JSON.parse(rawuser) : null;
    const token = user?.token;
    if (token !== undefined) {
      setprivateCheck(true);
    }
    localStorage.removeItem("cart");

    // Set the initial main image
    if (product?.images && product.images.length > 0) {
      setMainImage(`data:${product.images[0].contentType};base64,${product.images[0].data}`);
    }
  }, [product?.images]);

  const handleThumbnailClick = (image: ProductImage) => {
    setMainImage(`data:${image.contentType};base64,${image.data}`);
  };

  return (
    <div className="bg-gray-50 font-sans">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <Link to="/" className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition-colors duration-300">
          E-Shop
        </Link>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Login & Cart */}
        <div className="flex items-center space-x-4">
          {!privateCheck ? (
            <Link to="/login" className="text-blue-700 hover:text-blue-900 transition-colors duration-300">
              <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 focus:outline-none">
                Login
              </button>
            </Link>
          ) : (
            <span className="text-gray-600">Welcome, User!</span>
          )}

          <button
            onClick={() => setShowCart(true)}
            className="relative bg-amber-200 p-2 rounded-md cursor-pointer hover:bg-amber-300 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {/* You can add a cart item count here if you manage cart state globally */}
            {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
              {cartItemCount}
            </span> */}
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images Section */}
            <div className="relative">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product?.name}
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                />
              ) : (
                <div className="bg-gray-100 rounded-lg flex items-center justify-center h-96">
                  <span className="text-gray-500">No images available</span>
                </div>
              )}

              {product?.images && product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-md overflow-hidden border ${
                        mainImage === `data:${img.contentType};base64,${img.data}` ? 'border-blue-500' : 'border-black'
                      }`}
                      onClick={() => handleThumbnailClick(img)}
                    >
                      <img
                        src={`data:${img.contentType};base64,${img.data}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-20 object-cover transition-opacity duration-300 hover:opacity-90"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product?.name}</h1>
              <p className="text-gray-700 mb-6 leading-relaxed">{product?.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-semibold text-blue-700">${product?.price}</span>
                <span className="text-sm text-gray-600">
                  Stock: <span className={product?.stock > 0 ? "text-green-500" : "text-red-500"}>{product?.stock}</span> | Category: {product?.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={() => {
                    if (product) {
                      addToCart(product as ProductType);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors focus:outline-none"
                >
                  Add to Cart
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition-colors focus:outline-none"
                  onClick={() => {
                    if (product) {
                      placeOrder([{ productId: product._id, quantity: 1 }]);
                    }
                  }}
                >
                  Buy Now
                </button>
              </div>

              {/* Additional Product Information (Optional) */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Details</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Condition: New</li>
                  {/* Add more details as needed */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Your Cart</h2>
            <AddToCart onClose={() => setShowCart(false)} /> {/* Pass close function */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setShowCart(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Close Cart
              </button>
              <button
                onClick={() => {
                  const cart = localStorage.getItem("cart");
                  const cartItems = cart ? JSON.parse(cart) : [];

                  const formattedProducts = cartItems.map((item: CartObjectType) => ({
                    productId: item._id,
                    quantity: item.quantity || 1,
                  }));

                  placeOrder(formattedProducts);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedProducts;