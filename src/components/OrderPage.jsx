import React, { useState, useEffect } from 'react';
import { Box, Image, Text, VStack, HStack, SimpleGrid, GridItem, Button } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';
const OrderPage = () => {
  const location = useLocation();
  const [car, setCar] = useState(null);
  const { state } = location;
  const carId = state?.carId;
  const { searchData, setSearchData } = useSearch();
  const {  pickupDate, returnDate } = searchData;
  const totalAmount = state?.totalAmount;
  const { user } = useAuth();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        console.log("Fetching car details");
        const res = await axios.get(`http://localhost:3000/api/v1/user/getcarbyid/${carId}`);
        const data = res.data;
        setCar(data);
        console.log(data[0].carName);
      } catch (error) {
        console.log(error);
      }
    };

    if (carId) {
      fetchCar();
    }
  }, [carId]);

  if (!car) {
    return <Text>Loading...</Text>;
  }
  const handleOrder = async () => {
    try {
        console.log("hit")
        console.log(user)
    console.log(user.id)
      const orderData = {
        carId: car[0]._id,
        
        totalAmount: totalAmount,
         userId: user.id, // Replace with actual user ID
        officeLocationId: car[0].office,
        pickedat:pickupDate,
        returnedat:returnDate 
      };

      const response = await axios.post('http://localhost:3000/api/v1/user/createorder', orderData);
      console.log('Order placed successfully', response.data);
      if(response.data.success==true)
      alert("orderplaced successfully");
      // You can redirect the user or show a success message here
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle the error appropriately
    }
  };
  return (
    <Box p={5}>
      {console.log(car)}
      <HStack spacing={10} mt={10} align="start">
        <Image src={car[0].carPicture} alt="Car Image" boxSize="300px" />
        <VStack spacing={4} align="start" width="full">
          <Text fontSize="2xl" fontWeight="bold">{car[0].carName}</Text>
          <SimpleGrid columns={2} spacing={10} width="full">
            <GridItem>
              <Text>Car Model: {car[0].carModel}</Text>
              <Text>Car Company: {car[0].carCompany}</Text>
              <Text>Car Engine: {car[0].carEngine}</Text>
            </GridItem>
            <GridItem>
              <Text>Car Fuel Type: {car[0].carFuelType}</Text>
              <Text>Car Mileage: {car[0].carMileage}</Text>
              <Text>Seat Capacity: {car[0].carSeatCapacity}</Text>
              <Text>office id: {car[0].office}</Text>
            </GridItem>
          </SimpleGrid>
          <Text>Total Price: ${totalAmount}</Text>
          <Button onClick={handleOrder} colorScheme="teal" size="md">Place Order</Button>
        </VStack>
      </HStack>
    </Box>
  );
};

export default OrderPage;
