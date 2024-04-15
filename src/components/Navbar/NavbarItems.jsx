import React from 'react';
import { Box } from '@chakra-ui/react';
import CreatePost from './CreatePost';
import Message from './Message';
import ProfileLink from './ProfileLink';
import Search from './Search';
import Wishlist from './Wishlist';

const NavbarItems = () => {
    return (
        <>
           
            <Search />{/* Center */}
            <Box position="absolute" right="4" display="flex" alignItems="center"> {/* Positioned to the far right */}
                <CreatePost />
                <Wishlist />
                <Message />
                <ProfileLink /> 
            </Box>
           
        </>
    );
}

export default NavbarItems;

