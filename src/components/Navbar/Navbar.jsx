import React from 'react';
import { Box, Link, Flex, Image } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { EcoMobileLogo } from "../../assets/constants";
import NavbarItems from './NavbarItems';

const Navbar = () => {
    return (
       
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            top={0} 
            px={{ base: 2, md: 4 }} 
            width="100%" 
            height={{ base: "70px", md: "90px" }} 
            bg="white" 
            zIndex={10} 
            borderBottom="1px solid lightgray"

        >
            {/* Inner Box content */}
            <Flex align="center" gap={6} cursor="pointer">
            <Link to={"/"} as={RouterLink} display={{ base: "none", md: "block" }}>
            <Image src='https://s3.amazonaws.com/mobilecause-avatar-production/shared_img/shared_imgs/508383/original/KnightNation_Logo_2020.png?1611942961'
            h={20} cursor={"pointer"} alt='EcoExchange'  /> 
            </Link>
    
             <NavbarItems /> 
            </Flex>
            {/* Placeholder for other content on the right side if needed */}
            <Box></Box>
        </Box>
    );
}

export default Navbar;

