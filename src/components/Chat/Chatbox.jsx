import { Container, VStack, Box } from '@chakra-ui/react';
import React from 'react';
import MessageInputBar from './MessageInputBar';
import Messages from './Messages';

const Chatbox = () => {
  return (
    <Container w="full" h="full" p={0} maxW="container.md" position="relative">
      {/* Messages container with padding at the bottom equivalent to input bar height */}
      <Box overflowY="auto" p={0} paddingBottom="75px" h="calc(100vh - 100px)"> {/* Adjust 100px based on Topbar height */}
        <Messages />
        {/* More <Message /> components can be added here */}
      </Box>
      {/* Fixed input bar at the bottom */}
      <Box position="absolute" bottom="0" left="0" right="0">
        <MessageInputBar />
      </Box>
    </Container>
  );
};

export default Chatbox;
