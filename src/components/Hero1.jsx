// src/components/Hero.jsx
import React from 'react';
import { useTheme } from '../context/themeContext';
import CarCard from './CarCard';
import { Box, Grid, Heading } from '@chakra-ui/react';
import carimag1 from '../assets/car1.png'
import axios from 'axios';
import { useState,useEffect } from 'react';

const Hero1 = () => {
  const { theme } = useTheme();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const res = await axios.get(
          "https://car-rental-website-backend.onrender.com/api/v1/user/getcars",
        );
        const data = await res.data;
        console.log(data);
        setCars(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCars();
  }, []);

  return (
    <Box bg={theme === 'dark' ? 'gray.900' : 'gray.100'} color={theme === 'dark' ? 'white' : 'black'} py="8">
      <Box maxW="1200px" mx="auto" px="4">
        <Heading as="h1" size="2xl" mb="8">Our Cars</Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="8">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Hero1;
