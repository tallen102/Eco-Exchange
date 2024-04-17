import { Box, Stack, Avatar, Text, Flex, IconButton, Menu, MenuButton, MenuList, MenuItem, Icon, MenuDivider } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'; // Assuming HamburgerIcon is used as placeholder
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";  // Added deleteDoc here
import React, { useContext, useEffect, useState } from "react";

import { auth, firestore } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from "../../context/ChatContext";
import { MoreIcon } from '../../assets/constants';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [authUser] = useAuthState(auth);
  const { data, dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (!authUser.uid) return;

    const unsub = onSnapshot(doc(firestore, "userChats", authUser.uid), (doc) => {
      setChats(doc.data());
    });

    return unsub;
  }, [authUser.uid]);

  useEffect(() => {
    if (data.chatId === "null" && chats) {
      const latestChat = Object.entries(chats)
        .sort(([_, a], [__, b]) => b.date - a.date)
        .find(([key]) => key !== "null");

      if (latestChat) {
        handleSelect(latestChat[1]?.userInfo);
      }
    }
  }, [chats, data.chatId]);

  const handleSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  const handleDelete = async (chatId) => {
    if (!chatId) return;

    try {
      const chatDoc = doc(firestore, "userChats", authUser.uid, "chats", chatId);
      await deleteDoc(chatDoc);

      setChats(prevChats => {
        const updatedChats = { ...prevChats };
        delete updatedChats[chatId];
        return updatedChats;
      });
    } catch (error) {
      console.error("Error deleting chat: ", error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));

    if (messageDate.toDateString() === new Date().toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return `${messageDate.getDate()}/${messageDate.getMonth() + 1}`;
    }
  };
  
  return (
    <>
      {Object.entries(chats ?? {}).sort((a, b) => b[1].date - a[1].date).map(([key, chat]) => (
        <Box
          key={key}
          w="340px"
          h="88px"
          _hover={{ bg: 'gray.50' }}
          overflow="hidden"
          onClick={() => handleSelect(chat.userInfo)}
        >
          <Flex alignItems="center" justifyContent="space-between" h="100%" p={2}>
            <Avatar size="md" name={chat.userInfo?.displayName} src={chat.userInfo?.photoURL} mr={2} />
            <Stack flex={1} spacing={0}>
              <Text fontWeight="bold" isTruncated>{chat.userInfo?.displayName}</Text>
              <Text fontSize="xs" isTruncated>{chat.userInfo?.username}</Text>
              <Flex alignItems="center" wrap="nowrap">
                <Text fontSize="xs" color="gray.500" isTruncated>{formatDate(chat.date?.toDate())}</Text>
                <Text mx={0.5}>·</Text>
                <Text fontSize="xs" isTruncated>{chat.lastMessage?.text}</Text>
              </Flex>
            </Stack>
            <Menu>
              <MenuButton as={IconButton} aria-label="Options" icon={<Icon as={MoreIcon} />} variant="ghost" size="sm" />
              <MenuList>
                <MenuItem onClick={() => handleDelete(key)}>Delete</MenuItem>
                <MenuDivider />
                <MenuItem>Option 2</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default Chats;
