import { useForm } from "react-hook-form"
import useUser from "../context/newUser";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
type Signupformtype={
   
    password:string;
    email: string;
}
const {login}=useUser()
    const {register,handleSubmit,formState:{errors}}=useForm<Signupformtype>()
    const [error,seterror]=useState<string | null>(null)
    const [loading,setloading]=useState<boolean>(false)


    const navigate=useNavigate()
    const onSubmit = async (data: Signupformtype) => {
        console.log(data);
        setloading(true)
        seterror(null)
        try {
         const request:boolean= await login(data.email,data.password) 
         if (request) {
            alert("Signip successful! You can now log in.");
           navigate("/")
         }
        

        

        } catch (error) {
            console.log(error)
            seterror("Signup failed. Please try again.");
            alert("signup unsuccessfull")

        }

        setloading(false)
        };
  return (
    <div>
 <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700"> signup</Link>
        </p>
      </div>
    </div>


    </div>
  )
}
