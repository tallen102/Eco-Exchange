import {
  Box,
  Stack,
  Avatar,
  Text,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons"; // Assuming HamburgerIcon is used as placeholder
import { doc, onSnapshot, deleteDoc } from "firebase/firestore"; // Added deleteDoc here
import React, { useContext, useEffect, useState } from "react";
import { timeAgo } from '../../utils/timeAgo'; 
import { auth, firestore } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from "../../context/ChatContext";
import { MoreIcon } from "../../assets/constants";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

const Chats = ({ directChatUser }) => {
  const { id } = useParams();
  const [chats, setChats] = useState([]);
  const [authUser] = useAuthState(auth);
  const { data, dispatch } = useContext(ChatContext);
  const [searchParams] = useSearchParams();
  const isPost = searchParams.get("post") ? true : false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) return;

    const unsub = onSnapshot(doc(firestore, "users", authUser.uid), (doc) => {
      console.log("Offers: ", doc.data()?.offers);
      const Offers = doc.data()?.offers;
      const offersMap = Offers?.reduce((acc, offer) => {
        acc[offer.chatId] = offer;
        return acc;
      }, {});

      if (offersMap) {
        setChats((prevChats) => ({
          ...prevChats,
          ...offersMap,
        }));
      }
    });

    return () => unsub();
  }, [authUser]);

  useEffect(() => {
    if (directChatUser) {
      setChats((prevChats) => ({
        ...prevChats,
        [data.chatId]: directChatUser,
      }));
    }
  }, [directChatUser]);

  const handleSelect = (userInfo) => {
    if (isPost && data.chatId !== userInfo.chatId) {
      navigate(`/chat/messages`);
    }
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  const handleDelete = async (chatId) => {
    if (!chatId) return;

    try {
      const chatDoc = doc(
        firestore,
        "userChats",
        authUser.uid,
        "chats",
        chatId
      );
      await deleteDoc(chatDoc);
      setChats((prevChats) => {
        const updatedChats = { ...prevChats };
        delete updatedChats[chatId];
        return updatedChats;
      });
    } catch (error) {
      console.error("Error deleting chat: ", error);
    }
  };

  {/*const formatDate = (timestamp) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') {
      console.error('Invalid or missing timestamp', timestamp);
      return "";
    }
    const dateInMilliseconds = timestamp.toDate().getTime();
    return timeAgo(dateInMilliseconds);
  }; */}

  return (
    <>
      {Object.entries(chats ?? {})
        .sort((a, b) => b[1].date - a[1].date)
        .map(([key, chat]) => (
          <Box
            key={key}
            w="340px"
            h="88px"
            _hover={{ bg: "gray.50" }}
            overflow="hidden"
            onClick={() => handleSelect(chat)}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              h="100%"
              p={2}
            >
              <Avatar
                size="md"
                name={chat?.displayName}
                src={chat?.photoURL}
                mr={2}
              />
              <Stack flex={1} spacing={0}>
                <Text fontWeight="bold" isTruncated>
                  {chat?.displayName}
                </Text>
                <Text fontSize="xs" isTruncated>
                  {chat?.username}
                </Text>
                <Flex alignItems="center" wrap="nowrap">
                  <Text fontSize="xs" color="gray.500" isTruncated>
                    {/*{formatDate(chat.date?.toDate())} */}
                  </Text>
                  <Text mx={0.5}>·</Text>
                  <Text fontSize="xs" isTruncated>
                    {chat.lastMessage?.text}
                  </Text>
                </Flex>
              </Stack>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<Icon as={MoreIcon} />}
                  variant="ghost"
                  size="sm"
                />
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
