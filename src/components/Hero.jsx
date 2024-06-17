import React from "react";
import carPng from "../assets/car.png";
import yellowCar from "../assets/banner-car.png";
import { useTheme } from "../context/themeContext";
import AOS from "aos";
import * as yup from "yup";
import { useEffect, useState } from "react";
import "aos/dist/aos.css"; // Add this import to include AOS styles
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'
const schema = yup
  .object({
 
    officeLocation: yup.string().required(),

  })
  .required();
const Hero = () => {
  const navigate = useNavigate();
  const [offices, setOffice] = useState([]);
  
  useEffect(() => {
    const officeList = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/getAllOffices",
      );
      const data = await res.data;
      console.log(data);
      setOffice(data);
    };
    officeList();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit=(data)=>{
    navigate("/user/carsbylocation", { state: { location: data.officeLocation } })
  }



  const { theme } = useTheme();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const uniqueCities = [...new Set(offices.map(office => office.city))];

  return (
    <div className="dark:bg-black dark:text-white duration-300">
      <div className="container min-h-[620px] flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? carPng : yellowCar}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32">
            <p data-aos="fade-up" className="text-primary text-2xl font-serif">
              Effortless
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              Car Rental
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              veritatis explicabo quibusdam quae reprehenderit ab{" "}
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="1500"
              onClick={() => {
                AOS.refreshHard();
              }}
              className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
            >
              Get Started
            </button>
          </div>
        </div>

        <div
          className="w-full max-w-3xl p-8 mt-8 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white"
          data-aos="fade-up"
          data-aos-delay="2000"
        >
          <form   onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="location" className="mb-2 font-semibold">
                Location
              </label>
        
              <select  id="location"
                className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"{...register("officeLocation")}>
                   <option value="" disabled selected>
                  Select a location
                </option>
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
            </div>
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="pickup-date" className="mb-2 font-semibold">
                Pickup Date
              </label>
              <input
                type="date"
                id="pickup-date"
                className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="return-date" className="mb-2 font-semibold">
                Return Date
              </label>
              <input
                type="date"
                id="return-date"
                className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex w-full sm:w-auto space-x-4">
              <button
                type="submit"
                className="w-full sm:w-auto py-2 px-4 font-semibold text-white  bg-red-950 rounded-md hover:bg-primary/80 transition duration-500"
              >
                Submit
              </button>
              <button
                type="button"
                className="w-full sm:w-auto py-2 px-4 font-semibold text-white bg-red-950 rounded-md hover:bg-secondary/80 transition duration-500"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
