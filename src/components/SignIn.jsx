import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signuplogo from '../assets/images/OIP.jpg'
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6),
  })
  .required();
const SignIn = () => {
  // const [username, setUsername] = useState('');
  const { login } = useAuth();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm({ resolver: yupResolver(schema) });
const navigate = useNavigate();
const onSubmit = async (data) => {
    try {
        const res = await axios.post(
            "https://car-rental-website-backend.onrender.com/api/v1/user/signin",
            data,
            {
                withCredentials: true,
            }
        );
        const{token,firstName,id,message,role}=res.data
        console.log(firstName)
        console.log(token)
        console.log(message)
        console.log(id)
        console.log(role)
        if (message === "Logged in successfully") {
          if(role=='admin'){
            navigate('/admin/dashboard')
          }else{
          login(firstName,id)
          navigate('/');
          }
        
      
          
        } else {
            console.error("Unexpected response:", message);
        }
    } catch (error) {
        console.error("Error during submission:", error);
    }
};
return (
    <div className='m-8'>

        <div className="max-w-md mx-auto bg-white  md:max-w-2xl">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <img className="h-full w-full object-cover md:h-full " src={signuplogo} alt="Modern building architecture"></img>
                </div>
                <div className="p-8">

                <form
  onSubmit={handleSubmit(onSubmit)}
  className="flex flex-col gap-y-2 rounded-md  p-6"
>

  
<input
        {...register("email")}
        placeholder="email"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}
      <input
        {...register("password")}
        placeholder="password"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}
      <input
        type="submit"
        className="rounded-md bg-blue-500 py-1 text-white ease-in hover:scale-105 hover:transition-all hover:delay-150"
      />
      <p>
        User not created yet{" "}
        <Link to="/user/signup" className="text-blue-500 underline">
          Signup
        </Link>
      </p>
</form>
                </div>
            </div>
        </div>


    </div>
)
}

export default SignIn