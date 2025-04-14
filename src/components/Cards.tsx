import { useNavigate } from "react-router-dom";
import useUser from "../context/newUser";

type ProductImage = {
  data: string;
  contentType: string;
  _id?: string; // Optional if the backend provides an _id
};

type ProductType = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: ProductImage[]; // Change from string[] to ProductImage[]
  uploaderId?: string;
};

export default function Cards({ prod }: { prod: ProductType }) {

  const { setSingleProduct } = useUser()

  const handleCart = (product: ProductType) => {
    console.log(product)
  };


  const navigate = useNavigate()
  const haldlePass = () => {
    setSingleProduct(prod)
    navigate("/detailedofproducts", { state: { prod } })
  }
console.log(prod.images[0]?.data.split(",/")[1])

  return (
    <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer transform transition-all duration-300 hover:scale-105" onClick={haldlePass}>
      <div className="h-60 bg-gray-200 rounded-md flex items-center justify-center">
        {prod.images.length > 0 ? (
          <img
          loading="lazy"
            src={`data:${prod.images[0].contentType};base64,${prod.images[0].data}`}
            alt={prod.name}
            className="w-full h-60 object-fill rounded-md"
          />
        ) : (
          <span className="text-gray-500">No Image Available</span>
        )}
      </div>
      <h4 className="mt-4 font-semibold text-gray-800">{prod.name}</h4>
      <p className="text-gray-600">${prod.price}</p>
      <button
        onClick={() => handleCart(prod)}
        className="mt-2 bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700"
      >
        View product
      </button>
    </div>
  );
}
