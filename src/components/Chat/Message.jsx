import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from "react";

import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [authUser] = useAuthState(auth);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  const bg = message.senderId === authUser.uid ? 'blue.100' : 'gray.200';
  const alignSelf = message.senderId === authUser.uid ? 'flex-end' : 'flex-start';
  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

    // Format hours
    let hours = dateObj.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    // Format date
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();

    return `${hours}:${minutes}${amOrPm} ${month} ${day}`;
  };



  return (
      <Box  ref={ref}  p={2} borderRadius="lg" alignSelf={alignSelf}>
        <Text style={{fontSize:'10px',display:'flex', justifyContent:alignSelf}}>{formatDate(message.date)}</Text>
        <Box bg={bg} p={2} borderRadius="lg" alignSelf={alignSelf}>

          <Text>{message.text}</Text>
          {message.img && <img width={300} src={message.img} alt="" />}
        </Box>
      </Box>
  );
};

export default Message;