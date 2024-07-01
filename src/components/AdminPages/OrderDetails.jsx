import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Divider, VStack } from '@chakra-ui/react';

const OrderDetails = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`https://car-rental-website-backend.onrender.com/api/v1/admin/getorder/${userId}`);
        const data = res.data;
        
        console.log(data.success)
        console.log(data.orders)

        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getOrders();
  }, [userId]);

  return (
    <Box p={5}>
      {orders.length > 0 ? (
        orders.map((order) => (
          <Box key={order._id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
            <Heading size="md" mb={2}>Invoice</Heading>
            <Divider mb={4} />
            <VStack align="start" spacing={2}>
              <Text><strong>ID:</strong> {order._id}</Text>
              <Text><strong>Name:</strong> {order.user.firstName}</Text>
              <Text><strong>Car Name:</strong> {order.car.carName}</Text>
              <Text><strong>Picking date:</strong> {order.pickedAt}</Text>
              <Text><strong>returning date:</strong> {order.returnedAt}</Text>
              <Text><strong>Total price:</strong> {order.totalPrice}</Text>

            

              {/* Add more fields as necessary */}
            </VStack>
          </Box>
        ))
      ) : (
        <Text>No orders available</Text>
      )}
    </Box>
  );
};

export default OrderDetails;
