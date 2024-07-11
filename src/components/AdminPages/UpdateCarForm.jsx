import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Input, Button, FormControl, FormLabel, Heading, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UpdateCarForm = () => {
    const navigate=useNavigate();
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [formData, setFormData] = useState({
        carName: '',
        carModel: '',
        carCompany: '',
        carCategory: '',
        carEngine: '',
        transmission: '',
        carMileage: '',
        carFuelType: '',
        rentalPriceCharge: '',
        carPicture: '',
    });
    

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await axios.get(`https://localhost:3000/api/v1/admin/getcarbyid/${carId}`);
                const data = res.data;
                console.log(data)
                setCar(data);
                console.log(res.data[0].carName)
                setFormData({
                    carName: res.data[0].carName,
                    carModel: res.data[0].carModel,
                    carCompany: res.data[0].carCompany,
                    carCategory: res.data[0].carCategory,
                    carEngine: res.data[0].carEngine,
                    transmission: res.data[0].transmission,
                    carMileage: res.data[0].carMileage,
                    carFuelType: res.data[0].carFuelType,
                    rentalPriceCharge: res.data[0].rentalPriceCharge,
                   
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchCar();
    }, [carId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`https://car-rental-website-backend.onrender.com/api/v1/admin/updatecar/${carId}`, formData);
            alert('Car updated successfully');
            navigate(`/admin/cars/${carId}`);
        } catch (error) {
            console.log(error);
        }
    };

    if (!car) {
        return <Box>Loading...</Box>;
    }

    return (
        <Flex direction="column" align="center" p="4">
            <Heading as="h1" mb="4">Update Car Details</Heading>
            <Box as="form" onSubmit={handleSubmit} w="100%" maxW="600px">
                <FormControl mb="4">
                    <FormLabel>Car Name</FormLabel>
                    <Input name="carName" value={formData.carName} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Model</FormLabel>
                    <Input name="carModel" value={formData.carModel} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Company</FormLabel>
                    <Input name="carCompany" value={formData.carCompany} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Category</FormLabel>
                    <Input name="carCategory" value={formData.carCategory} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Engine</FormLabel>
                    <Input name="carEngine" value={formData.carEngine} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Transmission</FormLabel>
                    <Input name="transmission" value={formData.transmission} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Car Mileage</FormLabel>
                    <Input name="carMileage" value={formData.carMileage} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Fuel Type</FormLabel>
                    <Input name="carFuelType" value={formData.carFuelType} onChange={handleChange} />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel>Rental Price Charge</FormLabel>
                    <Input name="rentalPriceCharge" value={formData.rentalPriceCharge} onChange={handleChange} />
                </FormControl>
                
                <Button type="submit" colorScheme="blue">Update</Button>
            </Box>
        </Flex>
    );
};

export default UpdateCarForm;
