import  { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { Link } from "react-router-dom";
import useProducts from "../customHooks/useProducts";

export default function Home() {
  const { getProducts, products } = useProducts();
const [privateCheck,setprivateCheck]=useState<boolean>(false)
  useEffect(() => {
    getProducts();
    const rawuser=localStorage.getItem("user")
    const user= rawuser ? JSON.parse(rawuser) : null
    const token=user?.token
    if (token!==undefined) {

    setprivateCheck(true)
    }
    localStorage.removeItem("cart")
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">E-Shop</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Login & Cart */}
        <div className="flex flex-row space-x-2 items-center">
        {
            !privateCheck ? ( <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Login
              </button>
            </Link>) : " "
          }
         
          <Link to="/cart">
          <button className="bg-amber-200 p-2 rounded-sm cursor-pointer">Cart</button>

          </Link>
          <Link to="/profile">
          <button className="bg-amber-200 p-2 rounded-sm cursor-pointer">Profile</button>

          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-500 text-white text-center py-16">
        <h2 className="text-4xl font-bold">Welcome to E-Shop</h2>
        <p className="text-lg mt-2">Find the best products at amazing prices!</p>
      </header>

      {/* Product Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
        {products.map((product, index) => (
          <Cards key={index} prod={product} />
        ))}
      </div>
    </div>
  );
}
