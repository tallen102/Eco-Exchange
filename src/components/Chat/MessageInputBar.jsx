import { HStack, Input, Button,Box } from '@chakra-ui/react';
import { ArrowForwardIcon, AttachmentIcon } from '@chakra-ui/icons';

import React, { useContext, useState,useRef } from "react";
import { doc } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from "../../context/ChatContext";
import { auth, firestore } from "../../firebase/firebase";
import { useParams } from 'react-router-dom';
import {
  arrayUnion,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable, getStorage } from "firebase/storage";


const MessageInputBar = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const storage = getStorage()
  const [authUser] = useAuthState(auth);
  const { data } = useContext(ChatContext);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(firestore, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: authUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(firestore, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: authUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(firestore, "userChats", authUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(firestore, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
     if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <HStack my={4}>
      <Input
        placeholder="Type your message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
  
  {/* <label htmlFor="file">
        <Box as="span" cursor="pointer" px={5}>
          <AttachmentIcon />
        </Box>
        <Input
          type="file"
          id="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          display="none" 
        />
      </label> */}

      <Button
        onClick={handleSend}
        colorScheme="blue"
        px={8}
        rightIcon={<ArrowForwardIcon />}
        isDisabled={!text.trim()}       >
      </Button>
    </HStack>
  );
};

export default MessageInputBar;