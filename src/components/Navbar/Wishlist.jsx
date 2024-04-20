import React from 'react';
import { Box, Flex, Tooltip } from '@chakra-ui/react';
import { FiHeart } from "react-icons/fi"; // Importing FiHeart

const Wishlist = () => {
    return (
        <Tooltip
            hasArrow
            label={"Add to favorites"} // Updated label to match the icon purpose
            placement='right'
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Flex
                alignItems={"center"}
                gap={1}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={1}
                //w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
            >
                <FiHeart color="black" size="24px" />
                <Box display={{ base: "none", md: "block" }}></Box>
            </Flex>
        </Tooltip>
    );
};

export default Wishlist;
