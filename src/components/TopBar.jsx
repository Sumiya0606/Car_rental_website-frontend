// src/components/TopBar.jsx
import React from 'react';
import { Box, Flex, Link, Spacer, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const { user, logout } = useAuth();

  return (
    <Box bg="gray.800" color="white" px="4" py="2">
      <Flex maxW="1200px" mx="auto" alignItems="center">
        <Text fontSize="sm">Welcome to Car Rental</Text>
        <Spacer />
        <Flex alignItems="center">
          {user ? (
            <>
              <Text fontSize="sm" mr="4">Hello, {user.username}</Text>
              <Button onClick={logout} size="sm" colorScheme="red">Logout</Button>
            </>
          ) : (
            <>
              <Link as={RouterLink} to="/user/signin" ml="4" fontSize="sm">
                Sign In
              </Link>
              <Link as={RouterLink} to="/user/signup" ml="4" fontSize="sm">
                Sign Up
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopBar;
