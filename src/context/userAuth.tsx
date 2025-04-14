import  { createContext, useState } from "react";
import { Url } from "../../contant";


type User = {
  name: string;
  email: string;
  token?: string; // Optional token if your API returns it
};
type ProductImage = {
  data: string;
  contentType: string;
  _id?: string; // Optional if the backend provides an _id
};
type singleProductType={
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: ProductImage[]; // Change from string[] to ProductImage[]
  uploaderId?: string;
}
type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: ProductImage[]; // Change from string[] to ProductImage[]
  uploaderId?: string;
}[]
type privatechecktype=boolean
type UserContextType = {
  user: User | null;
  singleProduct:singleProductType | null;
  cartArray: Product[] | null;
  privateCheck:privatechecktype;
  setprivateCheck:React.Dispatch<React.SetStateAction<privatechecktype>>
  setCartArray:React.Dispatch<React.SetStateAction<Product[] | null>>;
  setSingleProduct:React.Dispatch<React.SetStateAction<singleProductType | null>>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};


export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [singleProduct,setSingleProduct]=useState<singleProductType | null>(null)
  const [cartArray,setCartArray]=useState<Product[] | null>(null)
  const [privateCheck,setprivateCheck]=useState<privatechecktype>(false)

  // Signup Function
  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${Url}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
       
        throw new Error("Signup failed!");
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem("signupdata", JSON.stringify(data));
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  // Login Function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${Url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setprivateCheck(true)
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        singleProduct,
        setSingleProduct,
        cartArray,
        setCartArray,
        privateCheck,
        setprivateCheck, 
      }}
    >
      {children}
    </UserContext.Provider>
  );
  
};

