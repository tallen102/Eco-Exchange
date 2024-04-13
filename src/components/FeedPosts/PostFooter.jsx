import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const PostFooter = ({ postData }) => {
  return (
    <Box width="182.5px">
      {/* Title Flex */}
      <Flex alignItems="center" gap={2} > 
        <Text
          fontSize="sm"
          fontWeight={600}
          isTruncated   
          maxWidth="100%"  
          overflow="hidden"  
          whiteSpace="nowrap"  // Keeps the text on a single line
          textOverflow="ellipsis"  // Adds ellipsis at the end if text is too long
        >
          {postData.title}
        </Text>
    
      </Flex>

      {/* Price Flex */}
      <Flex alignItems="center" gap={24} w="full" mt={0}>
        <Text>{"$" + postData.price}</Text>
      </Flex>
    </Box>
  );
};

export default PostFooter;



