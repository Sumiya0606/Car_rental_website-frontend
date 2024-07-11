// src/components/CarDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Heading, Flex ,Button} from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useTheme } from '../context/themeContext';




const CarDetails = () => {
  const { theme } = useTheme();
  const { token} = useAuth();
  const navigate=useNavigate();
    const [cars, setCars] = useState([]);

    useEffect(() => {
      const getAllCars = async () => {
        try {
          const res = await axios.get(
            " https://car-rental-website-backend.onrender.com/api/v1/user/getcars",
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
const handleNext=()=>{
  console.log(token)
  if (!token) {
    alert("Need to login first")
    navigate('/user/signin');
    return;
  }
  // console.log(locationState)
  navigate(`/user/carorder1/${carId}`, { state: { rentalPriceCharge: car.rentalPriceCharge,carPicture:car.carPicture } });

}
  return (
    <div bg={theme === 'dark' ? 'gray.900' : 'gray.100'} color={theme === 'dark' ? 'white' : 'black'} >
    <Flex direction={{ base: 'column', md: 'row' }} p="4" maxW="1200px" mx="auto">
      <Box flex="1">
        <Image src={car.carPicture} alt={car.name} objectFit="cover" w="100%" h={{ base: '300px', md: '500px' }} />
      </Box>
      <Box flex="1" p="4">
        <Heading as="h1" mb="4">{car.carName}</Heading>
        <Text fontSize="lg" mb="4" fontWeight="bold">Model:{car.carModel}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">Company:{car.carCompany}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">Category:{car.carCategory}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">Engine:{car.carEngine}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">Transmission:{car.transmission}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">Mileage:{car.carMileage}</Text>
        <Text fontSize="lg" mb="4" fontWeight="bold">Fuel Type:{car.carFuelType}</Text>
        <Text fontSize="lg" fontWeight="bold">Rent:${car.rentalPriceCharge}/day</Text>
        <Flex mt="4" justifyContent="flex-end">
          <Button colorScheme="red" onClick={handleNext}>Next</Button>
        </Flex>
      </Box>
    </Flex>
    </div>
  );
};

export default CarDetails;
