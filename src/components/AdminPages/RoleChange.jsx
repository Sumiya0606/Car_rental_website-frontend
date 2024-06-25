import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Select, VStack, Text , Button} from '@chakra-ui/react';
import axios from 'axios';

const RoleChange = () => {
    const [role, setRole] = useState('');
    const { userId } = useParams();
    const [message, setMessage] = useState('');

    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };

    const updateRole = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/admin/updateuserrole/${userId}`, {
              role: role,
            });
          if (res.data.success) {
            setMessage('Role updated successfully');
          } else {
            setMessage('Failed to update role');
          }
        } catch (error) {
          console.error('Error updating role:', error);
          setMessage('An error occurred');
        }
      };

  return (
    <Box p={5} maxWidth="400px" mx="auto" mt={10}>
      <Heading mb={4}>Select Role to Change</Heading>
      <VStack spacing={4} align="stretch">
        <Select placeholder="Select role" value={role} onChange={handleRoleChange}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>
        {role && (
          <Text>
            Selected Role: <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong>
          </Text>
        )}
        <Button onClick={updateRole} colorScheme="blue" isDisabled={!role}>
          Update Role
        </Button>
        {message && <Text mt={4}>{message}</Text>}
      </VStack>
    </Box>
  );
};


export default RoleChange