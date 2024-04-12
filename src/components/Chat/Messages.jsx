import { VStack, Text, Center, Box } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import Message from './Message';

import React, { useContext, useEffect,useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { ChatContext } from "../../context/ChatContext";
import {firestore } from "../../firebase/firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(firestore, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);


  return (
    <VStack spacing={4} align="stretch">
    {data.chatId === "null" ? (
      <Center>
        <Box textAlign="center" mt="20px">
        <EmailIcon boxSize={8} />
          <Text fontWeight='bold'>Your Messages</Text>
          <Text>Send private messages to other users</Text>
        </Box>
      </Center>
    ) : (
      messages.map((msg, index) => (
        <Message key={msg.id} message={msg} />
      ))
    )}
    </VStack>
  );
}

export default Messages;
