import { useForm } from "react-hook-form"
import useUser from "../context/newUser";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
type Signupformtype={
    name: string;
    password:string;
    email: string;
}
const {signup}=useUser()
    const {register,handleSubmit,formState:{errors}}=useForm<Signupformtype>()
    const [error,seterror]=useState<string | null>(null)
    const [loading,setloading]=useState<boolean>(false)

const navigate=useNavigate()

    const onSubmit = async (data: Signupformtype) => {
        console.log(data);
        setloading(true)
        seterror(null)
        try {
          await signup(data.name,data.email,data.password) 
          alert("Signup successful! You can now log in.");
         navigate("/login")
         

        } catch (error) {
          console.log("Signup Error:", error);
          alert( "Signup failed. Please try again.");
          seterror( "Signup failed. Please try again.");

        }

        setloading(false)
        };
  return (
    <div>
 <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className=" flex flex-row space-x-0.5">
        <p>Already signup </p>
        <Link to={"/login"} className="text-green-900">Login</Link>
        </div>
     
      </div>
    </div>


    </div>
  )
}
