import React from 'react';
import { Box, Link, Flex, Image } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { EcoMobileLogo } from "../../assets/constants";
import NavbarItems from './NavbarItems';

const Navbar = () => {
    return (
        <Box
            height={{ base: "70px", md: "240px" }} // Adjusted height for different screen sizes
            borderBottom="1px solid"
            borderColor="blackAlpha.400"
            border="1px solid red" // Adding red border around the whole Navbar
            position="sticky"
            top={0}
            px={{ base: 2, md: 4 }}
        >
            {/* Outer Box content */}
            {/* Inner Box with red border */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                position="absolute" // Positioning the inner Box absolutely
                top="0%" // Adjust top position as needed
                left="4%" // Adjust left position to add equal spacing
                width="92%" // Adjusted width to leave equal spacing on both sides
                height="40%" // Adjusted height to fit within the outer Box
                border="1px solid red" // Red border around the inner Box
            >
                {/* Inner Box content goes here */}
                <Flex align="center" gap={6} cursor="pointer">
                    <Link to={"/"} as={RouterLink} display={{ base: "none", md: "block" }}>
                        <Image src='https://s3.amazonaws.com/mobilecause-avatar-production/shared_img/shared_imgs/508383/original/KnightNation_Logo_2020.png?1611942961'
                            h={20} cursor={"pointer"} alt='EcoExchange' />
                    </Link>
                    {/* Nesting NavbarItems component */}
                    <NavbarItems />
                </Flex>
                {/* Placeholder for other content on the right side if needed */}
                <Box></Box>
            </Box>
        </Box>
    );
}

export default Navbar;
