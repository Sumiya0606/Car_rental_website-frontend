// src/components/CarDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Heading, Flex } from '@chakra-ui/react';
import { useState,useEffect } from 'react';

import axios from 'axios';



const CarDetails = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
      const getAllCars = async () => {
        try {
          const res = await axios.get(
            "http://localhost:3000/api/v1/user/getcars",
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
  
  const { carId } = useParams();
  const car = cars.find(c => c.id === carId);

  if (!car) {
    return <Text>Car not found</Text>;
  }

  return (
    <Flex direction={{ base: 'column', md: 'row' }} p="4" maxW="1200px" mx="auto">
      <Box flex="1">
        <Image src={car.carPicture} alt={car.name} objectFit="cover" w="100%" h={{ base: '300px', md: '500px' }} />
      </Box>
      <Box flex="1" p="4">
        <Heading as="h1" mb="4">{car.carName}</Heading>
        <Text fontSize="lg" mb="4">{car.carModel}</Text>
        <Text fontSize="2xl" fontWeight="bold">${car.price}/day</Text>
      </Box>
    </Flex>
  );
};

export default CarDetails;
