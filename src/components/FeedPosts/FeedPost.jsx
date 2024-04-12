import React from "react";
import { Box, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import PostFooter from "./PostFooter";

const FeedPost = ({ postData }) => {
  return (
    <Flex direction="column">
      <Link to={`/postpage?id=${postData.id}`}>
        <Box>
          <Image
            src={postData.imageURL}
            width="182.5px"
            height="182.5px"
            borderRadius="3px"
          />
        </Box>
      </Link>
      <PostFooter postData={postData} />
    </Flex>
  );
};

export default FeedPost;

