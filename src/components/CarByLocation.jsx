import React from 'react'
import { useTheme } from '../context/themeContext';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CarCard from './CarCard';
import { Box, Grid, Heading } from '@chakra-ui/react';
import axios from 'axios';
const CarByLocation = () => {
    const location = useLocation();
    const { location: officeLocation } = location.state || {};
    const { theme } = useTheme();
    const [cars, setCars] = useState([]);
  
    useEffect(() => {
      const getCarsByLocation = async () => {
        
        try {
          const res = await axios.get(`https://car-rental-website-backend.onrender.com/api/v1/user/getcarbylocation/${officeLocation}`, 
            
          );
          setCars(res.data);
        } catch (error) {
          console.error('Error fetching cars:', error);
         
        }
      };
      getCarsByLocation();
    }, [officeLocation]);
    return(
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

export default CarByLocation