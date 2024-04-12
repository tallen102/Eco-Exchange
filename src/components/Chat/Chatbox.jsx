import { Container, VStack, Spacer } from '@chakra-ui/react';
import React from 'react';
import MessageInputBar from './MessageInputBar';
import Messages from './Messages';
const Chatbox = () => {
  return (
    <Container w="full" h="full" borderLeft="1px solid" p={0} maxW="container.md">
      {/* Use VStack for vertical stacking and Spacer to push Input to the bottom */}
      <VStack spacing={4} align="stretch" h="full">
        {/* Container or Box can be used here to wrap Messages if needed for scroll */}
        <Container overflowY="auto" p={0}>
          <Messages />
          {/* More <Message /> components can be added here */}
        </Container>
        <Spacer />
        <MessageInputBar/>
      </VStack>
    </Container>
  );
};

export default Chatbox;
