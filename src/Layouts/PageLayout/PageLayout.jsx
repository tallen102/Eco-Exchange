import React from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Box, Spinner } from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Menubar from '../../components/Filter/Menubar';

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderNavbar = pathname !== "/auth" && user; 
  const canRenderMenubar = pathname !== "/auth" && user;

  const checkingUserIsAuth = !user && loading;
  
  if(checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <Flex flexDirection="column" minHeight="100vh">
      {/* Navbar */}
      {canRenderNavbar && (
        <Box h={{ base: "70px", md: "240px" }}>
          <Navbar />
        </Box>
      )}
      {/* Menubar */}
      {canRenderMenubar && (
        <Box>
          <Menubar />
        </Box>
      )}
      {/* Main content */}
      <Box flex={1} w="100%">
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
