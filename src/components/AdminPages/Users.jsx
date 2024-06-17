// UserList.jsx
import React, { useEffect, useState } from 'react';
import { Box, Table, Tbody, Tr, Td, Spinner, Heading } from '@chakra-ui/react';
import UserCard from './UserCard';
import axios from 'axios'
import { Link, useNavigate ,useLocation } from "react-router-dom";



const Users = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [users,setUsers]=useState([]);
    useEffect(() => {
        const getAllUSers = async () => {
          try {
            const res = await axios.get(
              "https://car-rental-website-backend.onrender.com/api/v1/admin/getAllUsers",
            );
            const data = await res.data;
            console.log(data);
          
            setUsers(data);
          } catch (error) {
            console.log(error);
          }
        };
        getAllUSers();
      }, []);
      const roleToFilter = location.pathname.includes('/admin/admin') ? 'admin' : 'customer';
      const filteredUsers = users.filter(user => user.role === roleToFilter);
      const handleRowClick = (userId) => {
        navigate(`${location.pathname}/${userId}`);
      };
  return (
    <Box p={5}>
  
    <Table variant="simple">
      <Tbody>
      {filteredUsers.map((user) => (
            <Tr key={user._id} onClick={() => handleRowClick(user._id)} style={{ cursor: 'pointer' }}>
              <Td>ID: {user._id}</Td>
              <Td>Name: {user.firstName}</Td>
              <Td>Email: {user.email}</Td>
              <Td>Phone: {user.contactNumber}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  </Box>
  );
};

export default Users;
