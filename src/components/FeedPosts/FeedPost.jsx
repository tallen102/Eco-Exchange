import React from "react";
import { Box, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import PostFooter from "./PostFooter";

const FeedPost = ({ postData }) => {
  return (
    <Link to={`/postpage?id=${postData.id}`}>
      <Flex direction="column">
        <Box>
          <Image
            src={postData.imageURL}
            width="182.5px"
            height="182.5px"
            borderRadius="3px"
          />
        </Box>
        <PostFooter postData={postData} />
      </Flex>
    </Link>
  );
};

export default FeedPost;
