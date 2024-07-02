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
  const { searchData } = useSearch();
  const { pickupDate, returnDate } = searchData;
  const totalAmount = state?.totalAmount;
  const { user } = useAuth();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`https://car-rental-website-backend.onrender.com/api/v1/user/getcarbyid/${carId}`);
        const data = res.data;
        setCar(data);
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
      const orderData = {
        carId: car[0]._id,
        totalAmount: totalAmount,
        userId: user.id,
        officeLocationId: car[0].office,
        pickedat: pickupDate,
        returnedat: returnDate 
      };

      const response = await axios.post('https://car-rental-website-backend.onrender.com/api/v1/user/create-order', orderData);
      const { order, razorpayOrder } = response.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Add your Razorpay Key ID
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Car Rental",
        description: "Test Transaction",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          const data = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const verifyResponse = await axios.post('https://car-rental-website-backend.onrender.com/api/v1/user/verify-payment', data);

          if (verifyResponse.data.success) {
            alert("Payment successful!");
            // You can redirect the user or show a success message here
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.contact,
        },
        notes: {
          address: "Car Rental Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error('Error placing order:', error);
      // Handle the error appropriately
    }
  };

  return (
    <Box p={5}>
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
              <Text>Office ID: {car[0].office}</Text>
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