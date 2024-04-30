import React from 'react';
import { VStack } from '@chakra-ui/react'; // Import VStack for vertical stacking
import Chats from './Chats';

const Sidebar = ({ directChatUser }) => {
  return (
    <VStack spacing={0} w="full" h="full" overflowY="auto" boxShadow="sm">
      <Chats directChatUser={directChatUser} />
    </VStack>
  );
};

export default Sidebar;