import { Box, Stack, Avatar, Text, Flex } from '@chakra-ui/react';
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

import { auth, firestore } from "../../firebase/firebase";
import { useParams } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from "../../context/ChatContext";


const Chats = () => {
  const [chats, setChats] = useState([]);

  const [authUser] = useAuthState(auth);
  const { data,dispatch } = useContext(ChatContext);

  
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(firestore, "userChats", authUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    authUser.uid && getChats();
  }, [authUser.uid]);

  useEffect(() => {
    if (data.chatId === "null" && chats) {
 
      const latestChat = Object.entries(chats)
        .sort(([_, chatA], [__, chatB]) => chatB.date - chatA.date)
        .find(([key, value]) => key !== "null");
      
      if (latestChat) {
        handleSelect(latestChat[1]?.userInfo);
      }
    }
  }, [chats, data.chatId]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // console.log(chats)
  function formatDate(timestamp) {
    if (!timestamp) return ''; // Return empty string if timestamp is not provided
  
    const currentDate = new Date(); // Today's date
    const yesterdayDate = new Date(currentDate); // Yesterday's date
    yesterdayDate.setDate(currentDate.getDate() - 1);
    
    const messageDate = new Date(timestamp);
  
    if (messageDate.toDateString() === currentDate.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterdayDate.toDateString()) {
      return "Yesterday";
    } else {
      return `${messageDate.getDate()}/${messageDate.getMonth() + 1}`;
    }
  }
  

  return (
   <>
   {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
    <Box
      w="340px"
      h="88px"
      //boxShadow="md"
      borderRadius="0"
      _hover={{ bg: 'gray.50' }}
      //border="1px solid white"
      overflow="hidden"
      key={chat[0]}
      onClick={() => handleSelect(chat[1]?.userInfo)}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        h="100%"
        p={2}
      >
        <Avatar
          size="md"
          name={chat[1].userInfo?.displayName}
          src={chat[1].userInfo?.photoURL}
          mr={2}
        />
        <Stack flex={1} spacing={0}> {/* No spacing between Stack items */}
          <Text fontWeight="bold" isTruncated>
          {chat[1].userInfo?.displayName}
          </Text>
          <Text fontSize="xs" isTruncated>{chat[1].userInfo?.username}</Text>
          <Flex alignItems="center" wrap="nowrap">
            <Text fontSize="xs" color="gray.500" isTruncated>{formatDate(chat[1]?.date?.toDate())}</Text>
            <Text mx={0.5}>·</Text> {/* Even smaller margin for the dot */}
            <Text fontSize="xs" isTruncated>
            {chat[1].lastMessage?.text}
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Box>
       ))}
    </>
  );
};

export default Chats;


