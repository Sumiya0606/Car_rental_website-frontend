// UserDetails.jsx
import React from 'react';
import { Box, Flex, Heading, Image, Text, Button, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';


const UserDetails = () => {
    const [users,setUsers]=useState([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    useEffect(() => {
        const getAllUSers = async () => {
          try {
            const res = await axios.get(
              "https://car-rental-website-backend.onrender.com/api/v1/admin/getAllUsers",
            );
            const data = await res.data;
            console.log(data);
            setUsers(data);
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
        getAllUSers();
      }, [userId]);
     
      const user = users.find(c => c._id === userId);
      console.log(user)

  if (!user) {
    return <Box p={5}>User not found</Box>;
  }

  return (
    <Box p={5}>
      <Flex direction={{ base: 'column', md: 'row' }} p="3" maxW="800px" mx="auto" mb="4" boxShadow="md" borderWidth="1px" borderRadius="md" bg="white">
        <Box flex="1">
          <Image src={user.image} alt={user.name} objectFit="cover" w="100%" h="auto" borderRadius="md" />
        </Box>
        <Box flex="1" p="3">
          <Heading as="h3" size="md" mb="3">{user.firstName}</Heading>
          <Text fontSize="md" mb="3">Email: {user.email}</Text>
          <Text fontSize="md" mb="3">Phone: {user.contactNumber}</Text>
          <Text fontSize="md">{user.details}</Text>
          <VStack spacing="2" mt="3">
          {user.role !== 'admin' && (
              <Button colorScheme="blue">View Orders</Button>
            )}
            <Button colorScheme="green">change role</Button>
            <Button colorScheme="red">Delete</Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserDetails;
