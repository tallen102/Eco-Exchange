import React from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Box, Spinner, useBreakpointValue } from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Menubar from '../../components/Filter/Menubar';

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderNavbar = pathname !== "/auth" && user;
  const canRenderMenubar = pathname !== "/auth" && pathname !== "/contact" && user;

  const checkingUserIsAuth = !user && loading;

  if (checkingUserIsAuth) return <PageLayoutSpinner />;


  const navbarHeight = useBreakpointValue({ base: "70px", md: "100px" });

  return (
    <Flex flexDirection="column" minHeight="100vh">
      {/* Navbar */}
      {canRenderNavbar && (
        <Box 
          position="sticky"
          top={0}
          zIndex={10}
          h={navbarHeight}
        >
          <Navbar />
        </Box>
      )}
      {/* Menubar */}
      {canRenderMenubar && (
        <Box
          position="sticky"
          top={navbarHeight}  // Dynamically set based on the actual Navbar height
          zIndex={9}  
        >
          <Menubar />
        </Box>
      )}
      {/* Main content */}
      <Box flex={1} w="full">
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
      <Spinner size='xl' />
    </Flex>
  );
}
