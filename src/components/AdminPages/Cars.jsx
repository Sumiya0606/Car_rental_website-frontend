import React, { useEffect, useState } from 'react';
import { Box, Table,Flex,Button, Tbody, Tr, Td, Spinner, Heading } from '@chakra-ui/react';
import UserCard from './UserCard';
import axios from 'axios'
import { Link, useNavigate ,useLocation } from "react-router-dom";



const Cars = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cars,setCars]=useState([]);
    useEffect(() => {
        const getAllCars = async () => {
          try {
            const res = await axios.get(
              "http://localhost:3000/api/v1/admin/getcars",
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
 
      const handleRowClick = (carId) => {
        navigate(`${location.pathname}/${carId}`);
      };
      const handleAddCarClick=()=>{
        navigate('/admin/addcar')
      }
  return (
    <Box p={5}>
   <Flex justify="flex-end" mb={4}>
        <Button colorScheme="blue" onClick={handleAddCarClick}>Add Car</Button>
      </Flex>
    <Table variant="simple">
      <Tbody>
      {cars.map((car) => (
            <Tr key={car._id} onClick={() => handleRowClick(car._id)} style={{ cursor: 'pointer' }}>
              <Td>ID: {car._id}</Td>
              <Td>Name: {car.carName}</Td>
              <Td>Rent: {car.rentalPriceCharge}</Td>
              <Td>Transmission: {car.transmission}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  </Box>
  );
};

export default Cars;
