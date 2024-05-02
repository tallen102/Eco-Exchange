import React from 'react';
import { Box, Link, Flex, Image, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import NavbarItems from './NavbarItems';

const Navbar = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start" // Ensure items start from the left
            top={0}
            px={{ base: 2, md: 4 }}
            width="100%"
            height={{ base: "70px", md: "90px" }}
            bg="white"
            zIndex={10}
            borderBottom="1px solid lightgray"
        >
            {/* Logo aligned to the left */}
            <Link to={"/"} as={RouterLink}>
                <Image
                    src='https://s3.amazonaws.com/mobilecause-avatar-production/shared_img/shared_imgs/508383/original/KnightNation_Logo_2020.png?1611942961'
                    h={20}
                    cursor={"pointer"}
                    alt='EcoExchange'
                    display={{ base: "none", md: "block" }} // Adjust display based on your responsive design
                />
            </Link>

            {/* Spacer to push content to center and right */}
            <Spacer />

            {/* Navbar items centered in the remaining space */}
            <Flex flexGrow={1} justifyContent="center" align="center">
                <NavbarItems />
            </Flex>

            {/* Spacer to balance the layout */}
            <Spacer />
        </Box>
    );
}

export default Navbar;



