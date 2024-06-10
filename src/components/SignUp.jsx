import React from 'react'
import signuplogo from '../assets/images/OIP.jpg'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const schema = yup
    .object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    })
    .required();
const SignUp = () => {
  // const [username, setUsername] = useState('');
  // const { login } = useAuth();
  // const navigate = useNavigate();
    // const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                data,
                {
                    withCredentials: true,
                }
            );
            const resData = res.data;
            console.log(res)
            if (resData === "Signed successfully!") {
               alert("Susses")
            } else {
                console.error("Unexpected response:", resData);
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
        {...register("firstName")}
        placeholder="First name"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      <input
        {...register("lastName")}
        placeholder="Last name"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}
      <input
        {...register("email")}
        placeholder="Email"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register("password")}
        placeholder="Password"
        type="password" // Added type="password"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" className="rounded-md bg-blue-500 py-1 text-white" />
      <p>
        User already exists{" "}
        {/* <Link to="/user/signin" className="text-blue-500 underline"> */}
          Signin
        {/* </Link> */}
      </p>
    </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default SignUp